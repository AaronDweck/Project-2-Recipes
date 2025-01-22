import express from 'express'
import Recipe from '../models/recipe.js'
import Category from '../models/category.js'
// import '../models/user.js'

const router = express.Router()

// get all recipes page
router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.find()
        res.render('recipes/index.ejs', {
            user: req.session.user,
            recipes: recipes
        })
    } catch (error) {
        next(error)
    }

})

// get recipe by id page
router.get('/recipe/:recipeID', async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeID).populate('categories').populate('user')
        res.render('recipes/show.ejs', {
            user: req.session.user,
            recipe: recipe
        })
    } catch (error) {
        next(error)
    }
})

// get all recipes by category page
router.get('/recipeByCategory/:categoryId', async (req, res, next) => {
    try {
        let recipes = await Recipe.find()
        recipes = recipes.filter(recipe => recipe.categories.includes(req.params.categoryId))
        res.render('recipes/indexByCategories.ejs', {
            user: req.session.user,
            recipes: recipes
        })
    } catch (error) {
        next(error)
    }
})

// create recipe page
router.get('/create-recipe', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const categories = await Category.find().sort({ name: 1 })

        res.render('recipes/new.ejs', {
            user: req.session.user,
            categories: categories
        })
    } catch (error) {
        next(error)
    }

})

// handle create recipe info
router.post('/create-recipe', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const categoryIds = []

        if (typeof (req.body.categories) === 'object') {
            for (const category of req.body.categories) {
                const categoryObj = await Category.findOne({ name: category })
                categoryIds.push(categoryObj._id)
            }
        } else {
            const categoryObj = await Category.findOne({ name: req.body.categories })
            categoryIds.push(categoryObj._id)
        }

        req.body.categories = categoryIds
        req.body.ingredients = req.body.ingredients.replace(/\r\n/g, '').split(';')
        req.body.directions = req.body.directions.replace(/\r\n/g, '').split(';')
        req.body.user = req.session.user

        console.log(req.body)

        const recipe = await Recipe.create(req.body)
        res.redirect(`/recipe/${recipe._id}`)
    } catch (error) {
        next(error)
    }

})

// update recipe page
router.get('/update-recipe/:recipeID', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const categories = await Category.find().sort({ name: 1 })

        const recipe = await Recipe.findById(req.params.recipeID)

        res.render('recipes/update.ejs', {
            user: req.session.user,
            categories: categories,
            recipe: recipe
        })
    } catch (error) {
        next(error)
    }

})

// handle update recipe info
router.put('/update-recipe/:recipeID', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const categoryIds = []
        if (typeof (req.body.categories) === 'object') {
            for (const category of req.body.categories) {
                const categoryObj = await Category.findOne({ name: category })
                categoryIds.push(categoryObj._id)
            }
        } else {
            const categoryObj = await Category.findOne({ name: req.body.categories })
            categoryIds.push(categoryObj._id)
        }

        req.body.categories = categoryIds
        req.body.ingredients = req.body.ingredients.replace(/\r\n/g, '').split(';')
        req.body.directions = req.body.directions.replace(/\r\n/g, '').split(';')
        req.body.user = req.session.user

        console.log(req.body)
        
        await Recipe.findByIdAndUpdate(req.params.recipeID, req.body, { runValidators: true })
        res.redirect(`/recipe/${req.params.recipeID}`)
    } catch (error) {
        next(error)
    }
})

export default router