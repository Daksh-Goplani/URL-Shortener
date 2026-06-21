import dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
    throw new Error("PORT is not defined in environment variable")
}
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variable")
}
if (!process.env.APP_URL) {
    throw new Error("APP_URL is not defined in environment variable")
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variable")
}

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    APP_URL: process.env.APP_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24 * 7,
}

export default config