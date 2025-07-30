import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Database configuration and connection
 * Connects to MongoDB using the connection string from environment variables
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('🔥 ===== MongoDB Atlas Connection Successful =====');
    console.log(`✅ Connected to MongoDB Atlas Cluster`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name || 'Portfolio'}`);
    console.log(`🔌 Port: ${conn.connection.port}`);
    console.log(`📊 Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`🗂️  Collections will be: contacts, projects, qualifications, users`);
    console.log('🔥 ============================================');
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

/**
 * Graceful shutdown of database connection
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed.');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message);
  }
};

// Handle application termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

export { connectDB, closeDB };
export default connectDB;
