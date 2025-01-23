import mongoose from "mongoose"
import User from "../models/user.js"
import Recipe from '../models/recipe.js'
import Category from '../models/category.js'
import data from "../data.js"
import dotenv from 'dotenv'

dotenv.config()

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI)
    await mongoose.connection.db.dropDatabase()
    const users = await User.create([
        {username: 'aaron', email: 'aarondweck24@gmail.com', password: 'Password1!'},
        {username: 'test', email: 'test@test.com', password: 'Password1!'}
    ])
    const categories = await Category.create(data.categories)

    data.recipes.forEach(recipe => {
        recipe.user = users[0]
        recipe.categories = categories[0]
    })
    await Recipe.create(data.recipes)
    await mongoose.disconnect()
}

seed()