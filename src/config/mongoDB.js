import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
//console.log('All environment variables:', process.env);


async function connectToMongoDB() {
    console.log('MONGO_URI:', process.env.MONGO_URI);
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

export default connectToMongoDB;