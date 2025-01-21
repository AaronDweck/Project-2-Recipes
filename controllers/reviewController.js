import express from 'express'
import Recipe from '../models/recipe.js'

const router = express.Router()

router.post('/:recipe/comment', async (req, res, next) => {
    try {
        console.log('hello')
    } catch (error) {
     next(error)   
    }
})