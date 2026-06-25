import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userDao from "../dao/user.dao.js";
import { ConflictError, UnauthorizedError } from "../utils/errorHandler.js";
import config from "../config/config.js";

export const registerUser = async (name, email, password) => {
    const user = await userDao.findUserByEmail(email);

    if (user) {
        throw new ConflictError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userDao.createUser(
        name,
        email,
        hashedPassword
    );

    const token = jwt.sign(
        { id: newUser._id },
        config.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {token, user: newUser};
};

export const loginUser = async (email, password) => {
    const user = await userDao.findUserByEmailAndPassword(email);

    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {token, user};
};