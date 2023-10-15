import { config } from "dotenv"

config()

export const mongoUri = process.env.MONGOURI
export const jwtSecret = process.env.SECRET

export const googleClinetSecret = process.env.GOOGLE_CLIENT_SECRET
export const googleClinetId = process.env.GOOGLE_CLIENT_ID
export const googleRedirect = process.env.GOOGLE_REDIRECT_URL