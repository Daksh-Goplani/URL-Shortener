import express from 'express'
import shortUrl from './routes/shortUrl.routes.js'
import { errorHandler } from './utils/errorHandler.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("", shortUrl)
app.use(errorHandler)

export default app