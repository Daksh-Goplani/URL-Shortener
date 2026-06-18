import { generateNanoid } from '../utils/helper.js'
import shortUrlDao from '../dao/shortUrl.dao.js'

export const createShortUrlWithoutUserService = async (url) => {
    const shortUrl = await generateNanoid(7)
    await shortUrlDao.saveShortUrl(url, shortUrl)
    return { shortUrl: shortUrl }
}

export const createShortUrlWithUserService = async (url, userId) => {
    const shortUrl = await generateNanoid(7)
    await shortUrlDao.saveShortUrl(url, shortUrl, userId)
    return { shortUrl: shortUrl }
}