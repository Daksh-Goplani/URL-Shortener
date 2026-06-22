import userModel from '../models/user.model.js'
import ShortUrlModel from '../models/shortUrl.model.js'

export const findUserByEmail = async (email)=>{
    return await userModel.findOne({email})
}

export const findUserById = async (id)=>{
    const userId = typeof id === 'object' && id?.id ? id.id : id
    return await userModel.findById(userId)
}

export const createUser = async (name, email, password) => {
    const newUser = new userModel({name, email, password})
    await newUser.save()
    return newUser
}

export const getAllUserUrlsDao = async (id) => {
    return await ShortUrlModel.find({user:id})
}

export default {
    findUserByEmail,
    findUserById,
    createUser,
    getAllUserUrlsDao
}