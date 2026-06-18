const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');  // ✅ Added
const { rateLimit } = require('./middleware/auth.middleware');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Performance Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());

// Rate limiting
app.use('/api/', rateLimit(15 * 60 * 1000, 100));

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5176',
    'http://localhost:5175',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5176'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files ✅ Fixed paths
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));

// Base routes
app.get('/', (req, res) => {
  res.json({ message: 'Farm Equipment Rental API is running!' });
});

// ✅ 404 BEFORE error handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Error handler LAST
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚜 Server running on port ${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server could not start:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;