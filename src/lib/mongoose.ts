import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

if (!URI) throw new Error("MongoDb URI missing in the connection function");

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }

    const conn = await mongoose.connect(URI);

    isConnected = conn.connection.readyState === 1;

    if (!isConnected) {
      throw new Error("MongoDB connection failed");
    }

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection error");
  }
};

export default connectDB;
