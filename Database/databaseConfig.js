import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const DatabaseConfig = () => mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log("Database connection Failed with error : ", error);
})