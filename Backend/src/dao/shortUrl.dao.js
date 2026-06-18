import ShortUrlModel from '../models/shortUrl.model.js'

export const saveShortUrl = async (url, shortUrl, userId) => {
    const newShortUrl = new ShortUrlModel({
        fullUrl: url,
        shortUrl: shortUrl,
    })
    if(userId) {
        newShortUrl.user = userId
    }
    await newShortUrl.save()
    return newShortUrl
}

export const findUrlFromShortUrl = async (shortUrl)=>{
    const UrlModel = await ShortUrlModel.findOneAndUpdate({ shortUrl: shortUrl }, { $inc: { clicks: 1 } })
    return UrlModel.fullUrl
}

export default {
    saveShortUrl,
    findUrlFromShortUrl
}