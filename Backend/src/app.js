import express from 'express'
import shortUrl from './routes/shortUrl.routes.js'
import { errorHandler } from './utils/errorHandler.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("", shortUrl)
app.use(errorHandler)

export default app