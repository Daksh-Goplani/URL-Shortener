import ShortUrlModel from "../models/shortUrl.model.js"
import userDao from "../dao/user.dao.js"

const getAllUserUrls = async (req, res) => {
    const { _id } = req.user
    const urls = await userDao.getAllUserUrlsDao(_id)
    res.status(200).json({
        message: "Success",
        urls
    })
}

export default {
    getAllUserUrls
}