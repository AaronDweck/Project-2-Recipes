import express from 'express'
import Recipe from '../models/recipe.js'

const router = express.Router()

router.get('/', async function (req, res, next) {
    try {
        const recipes = await Recipe.find()
        console.log(recipes)
        res.render('recipes/index.ejs')
    } catch (error) {
        next(error)
    }
    
})

export default router