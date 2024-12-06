import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const DB_NAME = "platesofhopes"
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed : ",error);
        process.exit(1)
    }
}

export default connectDB;