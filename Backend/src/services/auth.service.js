import jwt from 'jsonwebtoken'
import userDao from '../dao/user.dao.js'
import { ConflictError } from '../utils/errorHandler.js'
import config from '../config/config.js'

export const registerUser = async (name, email, password)=>{
    const user = await userDao.findUserByEmail(email)
    if(user) throw new ConflictError("User already exist")
    const newUser = await userDao.createUser(name, email, password)
    const token = await jwt.sign({id: newUser._id}, config.JWT_SECRET , {expiresIn: '1d'} )
    return token
}