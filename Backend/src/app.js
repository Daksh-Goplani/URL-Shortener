import express from 'express'
import { nanoid } from 'nanoid'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(nanoid(7))
})

export default app