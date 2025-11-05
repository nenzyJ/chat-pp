import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (mongoURI) => {
  try {
    const mongoUrl = ENV.MONGO_URI || "mongodb://localhost:27017/chat-app";
    const conn = await mongoose.connect(mongoUrl);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("Error in DB connection:", error);
    console.log("Server will continue without database connection...");
    // Не завершуємо процес, дозволяємо серверу працювати без БД
  }
};
