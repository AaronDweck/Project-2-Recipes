import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const categorySchema = new mongoose.Schema({
    name: {type: String, uniuqe: true, required: true}
})

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {
        type: String,
        required: [true, "You can't post an empty review."]
    }
})

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: [categorySchema], // ? might want to make this not an array
    description: {type: String},
    servings: {type: String},
    time: {type: String},
    ingredients: [{type: String, required: true}],
    directions: [{type: String, required: true}],
    reviews: [reviewSchema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

// using this plugin for keys that are unique to return a validation error
userSchema.plugin(uniqueValidator)

export default mongoose.model('Recipe', recipeSchema)