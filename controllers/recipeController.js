import express from 'express'
import Recipe from '../models/recipe.js'
import '../models/category.js'
import '../models/user.js'

const router = express.Router()

// get all recipes
router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.find()
        res.render('recipes/index.ejs', {
            recipes: recipes
        })
    } catch (error) {
        next(error)
    }
    
})

// get recipe by id
router.get('/recipe/:recipeID', async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeID).populate('categories').populate('user')
        console.log(recipe)
        res.render('recipes/show.ejs', {
            recipe: recipe
        })
    } catch (error) {
        next(error)
    }
})

export default router