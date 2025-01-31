import express from 'express'
import User from '../models/user.js'

const router = express.Router()

// get login page
router.get('/login', async (req, res, next) => {
    try {
        res.render('user/login.ejs', {
            user: req.session.user,
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
            user: req.session.user,
            query: req.query
        })
    } catch (error) {
        next(error)
    }
})

// handle signup info
router.post('/signup', async (req, res, next) => {
    try {
        if (req.body.password !== req.body.passwordConfirmation) {
            return res.redirect('/signup?passwordConfirmation=false')
        }
        await User.create(req.body)
        res.redirect('/login')
    } catch (error) {
        next(error)
    }
})

// handle login info
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { username: req.body.usernameOrEmail },
                { email: req.body.usernameOrEmail }
            ]
        })

        if (!user.isPasswordValid(req.body.password)) {
            return res.redirect('/login?error=true')
        }

        req.session.user = user
        res.redirect('/')
    } catch (error) {
        res.locals.page = '/login'
        next(error)
    }
})

export default router