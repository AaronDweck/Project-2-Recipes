import express from 'express'
import Recipe from '../models/recipe.js'
import Category from '../models/category.js'
import User from '../models/user.js'

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
        res.render('recipes/index.ejs', {
            user: req.session.user,
            recipes: recipes
        })
    } catch (error) {
        next(error)
    }
})

router.get('/saved-recipes', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const user = await User.findById(req.session.user._id)

        const recipes = []
        for (const recipeID of user.savedRecipes) {
            const recipe = await Recipe.findById(recipeID)
            recipes.push(recipe)
        }
        res.render('recipes/index.ejs', {
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
            categories: categories,
            error: req.query.error
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

        const recipe = await Recipe.create(req.body)
        res.redirect(`/recipe/${recipe._id}`)
    } catch (error) {
        res.locals.page = '/create-recipe'
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
            recipe: recipe,
            error: req.query.error
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

        const recipe = await Recipe.findById(req.params.recipeID)

        if (!recipe.user._id.equals(req.session.user._id)) {
            return res.send({ message: 'You are not authorized to update this recipe.' })
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

        await Recipe.findByIdAndUpdate(req.params.recipeID, req.body, { runValidators: true })
        res.redirect(`/recipe/${req.params.recipeID}`)
    } catch (error) {
        res.locals.page = `/update-recipe/${req.params.recipeID}`
        next(error)
    }
})

// route to delete a recipe by its id
router.delete('/recipe/:recipeID', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const recipe = await Recipe.findById(req.params.recipeID)

        if (!recipe.user._id.equals(req.session.user._id)) {
            return res.send({ message: 'You are not authorized to delete this recipe.' })
        }

        await Recipe.findByIdAndDelete(req.params.recipeID)

        await User.updateMany(
            { savedRecipes: recipe._id },
            { $pull: { savedRecipes: recipe._id } }
        )
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})

// saving a recipe to the user
router.post('/save-recipe/:recipeID', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const user = await User.findById(req.session.user._id)
        const recipe = await Recipe.findById(req.params.recipeID)

        if (!user.savedRecipes.includes(recipe._id)) {
            user.savedRecipes.push(recipe._id)
            await user.save()
            req.session.user = user
        }

        res.redirect(`/recipe/${req.params.recipeID}`)
    } catch (error) {
        next(error)
    }
})

// unsaving a recipe from the user
router.delete('/unsave-recipe/:recipeID', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }

        const user = await User.findById(req.session.user._id)
        const recipe = await Recipe.findById(req.params.recipeID)

        user.savedRecipes.splice(user.savedRecipes.indexOf(recipe._id), 1)

        await user.save()

        req.session.user = user

        res.redirect(`/recipe/${req.params.recipeID}`)
    } catch (error) {
        next(error)
    }
})


export default router