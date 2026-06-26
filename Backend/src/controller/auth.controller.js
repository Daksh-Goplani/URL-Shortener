import { cookieOptions } from "../config/config.js"
import { registerUser, loginUser } from "../services/auth.service.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    const { token, user } = await registerUser(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).send({
        message: "User Registered Successfully",
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const { token, user } = await loginUser(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).send({
        message: "User Login Successfully",
        user
    })
}

export const getCurrentUser = (req, res) => {
    return res.status(200).json({ user: req.user })
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export default {
    register,
    login,
    getCurrentUser,
    logout
}