import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (mongoURI) => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("Error in DB connection:", error);
    process.exit(1); // 1 status code mean fail, 0 mean success
  }
};
