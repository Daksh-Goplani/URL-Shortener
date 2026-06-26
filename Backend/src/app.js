import express from 'express'
import shortUrl from './routes/shortUrl.routes.js'
import { errorHandler } from './utils/errorHandler.js'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import { attachUser } from './utils/attachUser.js'
import cookieParser from 'cookie-parser'
import config from './config/config.js'
import userRoutes from './routes/user.routes.js'

const app = express()
app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(attachUser)

app.use("", shortUrl)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.use(errorHandler)

export default app