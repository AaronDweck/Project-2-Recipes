import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
})

// using this plugin for keys that are unique to return a validation error
categorySchema.plugin(uniqueValidator)

export default mongoose.model('Category', categorySchema)