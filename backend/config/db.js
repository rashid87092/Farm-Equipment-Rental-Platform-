const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || mongoURI.includes('<paste-your-mongodb-atlas-string-here>')) {
    console.warn('⚠️ MONGO_URI not set. Falling back to file-based JSON storage.');
    process.env.USE_FILE_DB = 'true';
    return Promise.resolve();
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;