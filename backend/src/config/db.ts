import 'dotenv/config';
import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    throw new Error('DB_URI is not defined in environment variables');
}

// Export a connection function
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1); // Exit if DB connection fails
    }

    // Event listeners
    mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('🔌 MongoDB disconnected');
    });
};

// Optional: Export mongoose instance for models
export default mongoose;