import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    if(mongoose.connections && mongoose.connections[0].readyState) return;
    const{ connection } = await mongoose.connect(process.env.MONGODB_URI as string , {
        dbName: "nextAuth",
      });
      
      console.log(`Connected to MongoDB  ${connection.host}`);
    } catch (error : any) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };