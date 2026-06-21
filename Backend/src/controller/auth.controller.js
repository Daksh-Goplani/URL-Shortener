import { cookieOptions } from "../config/config.js"
import { registerUser } from "../services/auth.service.js"

export const register = async (req, res) => {
    const { name , email, password} = req.body
    const token = await registerUser(name, email, password)
    res.cookie("Accesstoken", token, cookieOptions)
    res.status(200).send({
        message: "User Registered Successfully",
    })
}

export default {
    register
}