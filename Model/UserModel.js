import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
})

export const UserModel = mongoose.model("Userschema", userSchema)