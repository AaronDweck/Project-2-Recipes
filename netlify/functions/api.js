import express from 'express'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import serverless from 'serverless-http'
import recipeController from '../../controllers/recipeController.js'
import userController from '../../controllers/userController.js'
import errorHandler from '../../middleware/errorHandler.js'
import mongoSanitize from 'express-mongo-sanitize'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)

const app = express()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
}))

app.use(express.json())

app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(mongoSanitize({ replaceWith: '_' }))

app.use((req, res, next) => { 
	res.locals.user = req.session.user || null 
	next() 
})

app.use('/', recipeController)
app.use('/', userController)

app.use(errorHandler)

export const handler = serverless(app)