import ShortUrlModel from '../models/shortUrl.model.js'
import { ConflictError, NotFoundError } from '../utils/errorHandler.js'

export const saveShortUrl = async (url, shortUrl, userId) => {
    try {
        const newShortUrl = new ShortUrlModel({
            fullUrl: url,
            shortUrl: shortUrl,
        })
        if (userId) {
            newShortUrl.user = userId
        }
        await newShortUrl.save()
        return newShortUrl
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError('Short URL already exists')
        }
        throw error
    }
}

export const findUrlFromShortUrl = async (shortUrl) => {
    const urlModel = await ShortUrlModel.findOneAndUpdate(
        { shortUrl: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    )

    if (!urlModel) {
        throw new NotFoundError('Short URL not found')
    }

    return urlModel.fullUrl
}

const getCustomShortUrl = async (slug)=>{
    return await ShortUrlModel.findOne({shortUrl:slug})
}

export default {
    saveShortUrl,
    findUrlFromShortUrl,
    getCustomShortUrl
}