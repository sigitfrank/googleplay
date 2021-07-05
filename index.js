import express from 'express'
import gplay from 'google-play-scraper'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import appStore from 'app-store-scraper'
const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(session({
    key: 'ACLUB_SECRET_KEY_007',
    secret: 'ACLUB_SECRET_SESSION_007',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + (1 * 86400 * 1000)) //expires in a day
    }
}))
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/android', async (req, res) => {
    const response = await gplay.app({ appId: 'astronacci.aclub' })
    const { maxInstalls, ratings, size, reviews, released, scoreText } = response
    res.status(200).json({ success: true, data: { maxInstalls, ratings, scoreText, size, reviews, released } })
})
app.get('/apple', async (req, res) => {
    const response = await appStore.app({ id: 1563921460 })
    const { contentRating, size, } = response
    const formattedSize = `${size.substring(0, 2)}M`
    res.status(200).json({ success: true, data: { contentRating, formattedSize } })
})

app.listen(5000, () => {
    console.log(`App Running on port 5000`)
})