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

export default {
    register,
    login,
    getCurrentUser
}