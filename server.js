import express from 'express'
import mongoose from 'mongoose'
import recipeController from './controllers/recipeController.js'
import userController from './controllers/userController.js'
import errorHandler from './middleware/errorHandler.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url"
import methodOverride from 'method-override'
import mongoSanitize from 'express-mongo-sanitize'

dotenv.config()

const app = express()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/recipe-db',
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "public")))

app.use(mongoSanitize({ replaceWith: '_' }))

app.use('/', recipeController)
app.use('/', userController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

mongoose.connect('mongodb://127.0.0.1:27017/recipe-db')