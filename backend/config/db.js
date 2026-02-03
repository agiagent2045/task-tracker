const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if MONGODB_URI is configured
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  Warning: MONGODB_URI not configured. Running without database.');
    console.warn('   To connect to MongoDB, set MONGODB_URI in your .env file.');
    return;
  }

  try {
    // Set connection timeout options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Server will continue without database connection.');
    console.warn('   Database-dependent features will not work.');
    // Don't exit - allow server to start for demo/testing purposes
  }
};

module.exports = connectDB;
