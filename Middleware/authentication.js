import jwt from "jsonwebtoken";
import { UserModel } from "../Model/UserModel.js";

export const authentication = async (req, res, next) => {
  const { Token } = req.cookies;
  if (!Token) {
    return res
      .json({
        success: false,
        message: "Login first..",
      })
      .status(404);
  }
  const decoded = jwt.verify(Token, process.env.TOKEN_SECRET);
  req.user = await UserModel.findById(decoded._id);
  next();
};
