import express, { query } from 'express'
import User from '../models/user.js'

const router = express.Router()

// get login page
router.get('/login', async (req, res, next) => {
    try {
        res.render('user/login.ejs', {
            error: req.query.error
        })
    } catch (error) {
        next(error)
    }
})

// get signup page
router.get('/signup', async (req, res, next) => {
    try {
        res.render('user/signup.ejs', {
            query: req.query
        })
    } catch (error) {
        next(error)
    }
})

// handle signup info
router.post('/signup', async (req, res, next) => {
    try {
        if (req.body.password !== req.body.passwordConfirmation){
            return res.redirect('/signup?passwordConfirmation=false')
        }
        await User.create(req.body)
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
        next(error)
    }
} )

// handle login info
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { username: req.body.usernameOrEmail },
                { email: req.body.usernameOrEmail }
            ]
        })

        console.log(user)
        if(!user.isPasswordValid(req.body.password)){
            console.log('test')
            return res.redirect('/login?error=true')
        }
        req.session.user = user
        res.redirect('/')
    } catch (error) {
        // todo fix this to use a error handler middleware correctly
        res.redirect('/login?error=true')
        next(error)
        console.log('hi')
    }
})

export default router