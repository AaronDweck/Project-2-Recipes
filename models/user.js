import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate: {
            message: 'Please enter a valid email.',
            validator: (email) => validator.isEmail(email)
        } 
    },
    password: {
        type: String, 
        required: true,
        validate: {
            validator: (password) => {
                validator.isStrongPassword(password,{
                    minLength: 8,
                    minLowercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    minUppercase: 1
                })
            },
            message: 'The password must be 8 characters long and contain at least 1 upercase, lowercase and symbol'
        }
    },
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}]
})

// using this plugin for keys that are unique to return a validation error
userSchema.plugin(uniqueValidator)

// this function runs before addig a user to the database and hashes the users password
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
})

// this funciton checks if the password the user entered when hashed is equal to their hashed passowrd
userSchema.methods.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)