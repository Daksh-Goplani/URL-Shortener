import jwt from 'jsonwebtoken'
import config from '../config/config'
import userModel from '../models/user.model'

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json({
        Message: "Unauthorized"
    })

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        if (!user) return res.status(401).json({
            Message: "Unauthorized"
        })
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            Message: "Unauthorized"
        })
    }
}