import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const Protect = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();


};