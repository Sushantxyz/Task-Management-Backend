import express from "express";
import { Register, Login, Logout, getProfile } from "../Controllers/UserControlerFunc.js"
import { authentication } from "../Middleware/authentication.js";

export const UserRouter = express.Router();

UserRouter.get("/getProfile", authentication, getProfile);
UserRouter.post("/login", Login);
UserRouter.post("/register", Register);
UserRouter.post("/logout", Logout);

