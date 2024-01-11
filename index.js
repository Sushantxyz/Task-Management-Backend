import express from "express"
import { DatabaseConfig } from "./Database/databaseConfig.js"
import { TaskRouter } from "./Routers/TaskRouter.js"
import { UserRouter } from "./Routers/UserRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const server = express();
DatabaseConfig();

server.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.FRONTEND_URL1],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
dotenv.config();
server.use(cookieParser());
server.use(express.json());
server.use(TaskRouter);
server.use(UserRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
})


