import express from "express";
import { GetAllTasks, AddTask, UpdateTask, DeleteTask, UpdateData } from "../Controllers/taskControlerFunc.js"
import { authentication } from "../Middleware/authentication.js";

export const TaskRouter = express.Router();

TaskRouter.route("/").get(authentication, GetAllTasks).post(authentication, AddTask).put(authentication, UpdateData)

TaskRouter.route("/:id").put(authentication, UpdateTask).delete(authentication, DeleteTask);
