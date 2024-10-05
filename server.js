import express from "express";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/index.js";
import todoRouter from "./router/todoRouter.js";
import error from "./middlewares/error.js";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import { authenticate } from "./middlewares/authentication.js";

const app = express();
connectDB();

app.use(cors({
    origin:`https://todo-client-delta.vercel.app`,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow custom headers
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(morgan("dev"));
// app.use(express.urlencoded({extended:true}));

app.use("/todo",authenticate,todoRouter)
app.use("/auth",authRouter)

app.use(error);

app.listen(PORT,(err) =>{
    if(err) throw err;
    console.log(`Server running at Port ${PORT}`);
});
