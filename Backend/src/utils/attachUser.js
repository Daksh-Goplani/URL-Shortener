import config from "../config/config.js"
import { findUserById } from "../dao/user.dao.js"
import jwt from 'jsonwebtoken'

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return next()

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const userId = decoded?.id
        if (!userId) return next()
        const user = await findUserById(userId)
        if (!user) return next()
        req.user = user
        next()
    } catch (error) {
        next()
    }
}