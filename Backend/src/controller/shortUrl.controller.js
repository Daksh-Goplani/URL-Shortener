import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";
import config from "../config/config.js";


/**
 * @route POST /api/create
 * @description This route is used to create a short URL. It accepts a POST request with a JSON body containing the full URL. The response will be the shortened URL.
 */
export const createShortUrl = async (req, res) => { 
    const {url} = req.body
    if(!url){
        return res.status(400).json({error: "URL is required"})
    }
    const shortUrl = await createShortUrlWithoutUserService(url)
    res.status(201).json(config.APP_URL + "/" + shortUrl.shortUrl)
}

export default {
    createShortUrl
}