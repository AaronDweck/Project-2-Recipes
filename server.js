import express from 'express'
import mongoose from 'mongoose'
import recipeController from './controllers/recipeController.js'

const app = express()

app.use('/', recipeController)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

mongoose.connect('mongodb://127.0.0.1:27017/recipe-db')