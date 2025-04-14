import mongoose from 'mongoose'

const connectToDb=async() : Promise<void> =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
      } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
      }
}
export default connectToDb;