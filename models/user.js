import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {},
    firstName: {},
    lastName: {},
    email: {},
    password: {},
    savedRecipes: {}
})