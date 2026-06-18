import express from 'express';
const router = express.Router();
import shortUrlController from '../controller/shortUrl.controller.js';


/**
 * @route POST /api/create
 * @description This route is used to create a short URL. It accepts a POST request with a JSON body containing the full URL. The response will be the shortened URL.
 */
router.post("/api/create", shortUrlController.createShortUrl)
router.get("/:shortUrl", shortUrlController.redirectToFullUrl)

export default router;