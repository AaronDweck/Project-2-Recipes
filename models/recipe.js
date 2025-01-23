import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
        type: String,
        required: [true, "You can't post an empty review."]
    }
})

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }], // ? might want to make this not an array
    description: { type: String },
    servings: { type: String },
    time: { type: String },
    ingredients: [{ type: String, required: true }],
    directions: [{ type: String, required: true }],
    reviews: [reviewSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Recipe', recipeSchema)