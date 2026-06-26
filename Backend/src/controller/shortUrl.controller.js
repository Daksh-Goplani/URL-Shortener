import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shortUrl.service.js";
import config from "../config/config.js";
import shortUrlDao from "../dao/shortUrl.dao.js";
import { BadRequestError } from "../utils/errorHandler.js";


/**
 * @route POST /api/create
 * @description This route is used to create a short URL. It accepts a POST request with a JSON body containing the full URL. The response will be the shortened URL.
 */
export const createShortUrl = async (req, res, next) => {
    try {
        const data = req.body
        if (!data.url) {
            throw new BadRequestError("URL is required")
        }
        let shortUrl
        if (req.user) {
            shortUrl = await createShortUrlWithUserService(data.url, req.user._id, data?.slug)
        } else {
            shortUrl = await createShortUrlWithoutUserService(data.url)
        }
        res.status(201).json({ shortUrl: `${config.APP_URL}/${shortUrl.shortUrl}` })
    } catch (error) {
        next(error)
    }
}

export const redirectToFullUrl = async (req, res, next) => {
    try {
        const { shortUrl } = req.params
        const fullUrl = await shortUrlDao.findUrlFromShortUrl(shortUrl)
        res.redirect(fullUrl)
    } catch (error) {
        next(error)
    }
}

export default {
    createShortUrl,
    redirectToFullUrl
}