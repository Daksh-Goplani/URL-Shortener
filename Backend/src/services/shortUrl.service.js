import { generateNanoid } from '../utils/helper.js'
import shortUrlDao from '../dao/shortUrl.dao.js'

export const createShortUrlWithoutUserService = async (url) => {
    try {
        const shortUrl = generateNanoid(7)
        if (!shortUrl) {
            throw new Error("Failed to generate short URL")
        }
        await shortUrlDao.saveShortUrl(url, shortUrl)
        return { shortUrl }
    } catch (error) {
        throw error
    }
}

export const createShortUrlWithUserService = async (url, userId) => {
    try {
        const shortUrl = generateNanoid(7)
        if (!shortUrl) {
            throw new Error("Failed to generate short URL")
        }
        await shortUrlDao.saveShortUrl(url, shortUrl, userId)
        return { shortUrl }
    } catch (error) {
        throw error
    }
}