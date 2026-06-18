const jwt = require('jsonwebtoken');
const User = require('../models/User');

const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    for (const [key, timestamps] of requests.entries()) {
      const recent = timestamps.filter((timestamp) => timestamp > windowStart);
      if (recent.length === 0) {
        requests.delete(key);
      } else {
        requests.set(key, recent);
      }
    }

    const ipRequests = requests.get(ip) || [];
    const recentRequests = ipRequests.filter((timestamp) => timestamp > windowStart);

    if (recentRequests.length >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    recentRequests.push(now);
    requests.set(ip, recentRequests);

    return next();
  };
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    return next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  rateLimit,
};