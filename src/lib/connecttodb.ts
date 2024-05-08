import mongoose from 'mongoose';


export const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('Connected to MongoDB');
    } catch (error : any) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };