import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";
import config from "../config/config.js";
import shortUrlDao from "../dao/shortUrl.dao.js";


/**
 * @route POST /api/create
 * @description This route is used to create a short URL. It accepts a POST request with a JSON body containing the full URL. The response will be the shortened URL.
 */
export const createShortUrl = async (req, res) => {
    const { url } = req.body
    if (!url) {
        return res.status(400).json({ error: "URL is required" })
    }
    const shortUrl = await createShortUrlWithoutUserService(url)
    res.status(201).json(config.APP_URL + "/" + shortUrl.shortUrl)
}

export const redirectToFullUrl = async (req, res) => {
    const { shortUrl } = req.params
    const fullUrl = await shortUrlDao.findUrlFromShortUrl(shortUrl)
    if (!fullUrl) {
        return res.status(404).json({ error: "Short URL not found" })
    }
    res.redirect(fullUrl)
}

export default {
    createShortUrl,
    redirectToFullUrl
}