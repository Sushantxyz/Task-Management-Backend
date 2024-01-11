
import { UserModel } from "../Model/UserModel.js";
import CreateCookie, { deletecookie } from "../UtlilityFunctions/Cookies.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const getuser = await UserModel.findOne({ email });

        if (getuser) return res.status(400).json({ success: false, message: "Email already registered" });

        const hasspassword = await bcrypt.hash(password, 10);

        const newuser = await UserModel.create({
            username,
            email,
            password: hasspassword,
        });
        newuser.save();

        const token = jwt.sign({ _id: newuser._id }, process.env.TOKEN_SECRET);

        CreateCookie(res, token);

    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const getUser = await UserModel.findOne({ email }).select("+password");

        if (!getUser) return res.status(404).json({ sucess: false, message: "User don't exist..." });

        const validatepass = await bcrypt.compare(password, getUser.password);

        if (!validatepass)
            return res.status(404).json({ sucess: false, message: "Invalid Password" });

        const token = jwt.sign({ _id: getUser._id }, process.env.TOKEN_SECRET);

        await CreateCookie(res, token);

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Internal server error" });
    }
}

export const Logout = async (req, res) => {

    const { Token } = req.cookies;
    if (Token) {
        deletecookie(res, "Token");
    } else {
        res.status(400).json({ sucess: false, message: "Login first." });
    }
}

export const getProfile = async (req, res) => {

    const user = req.user;
    if (user) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(404).json({ success: false });
    }
}