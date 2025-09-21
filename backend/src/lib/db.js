import mongoose from 'mongoose';

export const connectDB = async (mongoURI) => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected:", conn.connection.host);
    } catch(error){
        console.log("Error in DB connection:", error);
        process.exit(1); // 1 status code mean fail, 0 mean success
    }
}