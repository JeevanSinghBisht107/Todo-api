import mongoose from "mongoose";
import { MONGODB } from "./index.js";

async function connectDB(){
    await mongoose.connect(MONGODB);
    console.log("Database Connected");
}

export { connectDB };

