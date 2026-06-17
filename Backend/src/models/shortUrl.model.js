import mongoose from 'mongoose'

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: [true, 'Full URL is required']
    },
    shortUrl: {
        type: String,
        required: [true, 'Short URL is required'],
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const ShortUrlModel = mongoose.model('ShortUrl', shortUrlSchema)

export default ShortUrlModel