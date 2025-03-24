import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes'
import cors from 'cors'
import cookieSession from 'cookie-session'

dotenv.config()

const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:4321',
    credentials: true
}))

const SIGN_KEY = process.env.SIGN_KEY
const ENCRYPT_KEY = process.env.ENCRYPT_KEY

if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error ('Error: cookie not found')
}

app.use(cookieSession({
    name: 'session',
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 24 * 60 * 60 * 1000
}))

app.use('/user', userRouter)


app.get('/', (req: Request, res: Response) => {
    console.log('someone visiting the server')
    res.status(200).send('Welcome to my server!')
})

app.get('/getCookie', (req: Request, res: Response) => {
    res.cookie('username', 'JohnDoe', {maxAge: 90000})
    res.status(200).send('cookie found!')
})

app.use((req: Request, res: Response) => {
    res.status(404).send('page not found')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})
