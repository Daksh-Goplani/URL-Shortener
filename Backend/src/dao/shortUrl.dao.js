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

export default {
    saveShortUrl
}