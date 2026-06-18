import express from 'express'
import { nanoid } from 'nanoid'
import shortUrl from './routes/shortUrl.routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/create", shortUrl)

export default app