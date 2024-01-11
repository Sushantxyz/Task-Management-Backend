import mongoose from "mongoose";
import { UserModel } from "./UserModel.js";
import { TaskModel } from "./TaskModel.js";


const mainSchema = mongoose.Schema({
    data: [
        {
            status: { type: String, default: "Incomplete" },
            tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskModel }],
        },
        {
            status: { type: String, default: "Ongoing" },
            tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskModel }],
        },
        {
            status: { type: String, default: "Complete" },
            tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskModel }],
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel }
})

export const MainModel = mongoose.model("MainSchema", mainSchema);