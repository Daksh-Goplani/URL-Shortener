import express from 'express'
import shortUrl from './routes/shortUrl.routes.js'
import { errorHandler } from './utils/errorHandler.js'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import { attachUser } from './utils/attachUser.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(attachUser)

app.use("", shortUrl)
app.use("/api/auth", authRoutes)

app.use(errorHandler)

export default app