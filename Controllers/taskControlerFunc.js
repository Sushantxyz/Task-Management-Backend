import { TaskModel } from "../Model/TaskModel.js";
import { MainModel } from "../Model/MainModel.js";

export const GetAllTasks = async (req, res) => {
    let TaskData;
    let User;
    try {
        User = req.user;
        const Check = await MainModel.find({ user: User._id });

        if (Check.length > 0) {
            const doublecheck = await MainModel.populate(Check, { path: 'data.tasks' });
            res.status(200).json({ sucess: true, data: doublecheck });
            return;
        }
        const data = [
            {
                status: "Incomplete",
                tasks: [],
            },
            {
                status: "Ongoing",
                tasks: [],
            },
            {
                status: "Complete",
                tasks: [],
            },
        ];
        const a = await MainModel.create({ data: data, user: User._id });
    } catch (error) {
        return res.status(500).json({ sucess: false, error: error });
    }

    try {
        TaskData = await MainModel.find({ user: User._id }).populate("data.tasks");
    } catch (error) {
        return res.status(500).json({ sucess: false, error: error });
    }

    res.status(200).json({ sucess: true, data: TaskData });
};

export const AddTask = async (req, res) => {
    const { newTask } = req.body;
    const userid = req.user._id;
    try {
        const createdTask = await TaskModel.create({
            task: newTask,
        });

        try {
            await MainModel.findOneAndUpdate(
                { user: userid, "data.status": "Incomplete" },
                { $push: { "data.$.tasks": createdTask } },
                { new: true }
            );

        } catch (error) {
            return res.json({ sucess: false, error: error }).status(404);
        }
    } catch (error) {
        return res.json({ sucess: false, error: error }).status(404);
    }

    res.json({ sucess: true, Message: "Task Created Successfully" }).status(200);
};

export const UpdateData = async (req, res) => {
    const { data } = req.body;
    const userid = req.user._id;

    try {
        await MainModel.findOneAndUpdate({ user: userid }, { data: data });
    } catch (error) {
        return res.json({ sucess: false, error: error }).status(404);
    }

    res.json({ sucess: true, Message: "Data Updated Successfully" }).status(200);
};

export const UpdateTask = async (req, res) => {
    const { id } = req.params;

    const { updatedTask } = req.body;

    try {
        await TaskModel.findByIdAndUpdate(
            { _id: id },
            {
                task: updatedTask,
            },
            { new: true }
        );
    } catch (error) {
        res.json({ sucess: false, error: error }).status(404);
    }
    res.json({ sucess: true, Message: "Task Updated Successfully" }).status(200);
};

export const DeleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await TaskModel.findByIdAndDelete({ _id: id });
    } catch (error) {
        res.json({ sucess: false, error: error }).status(404);
        return;
    }

    res.json({ sucess: true, Message: "Task Deleted Successfully" }).status(200);
};
