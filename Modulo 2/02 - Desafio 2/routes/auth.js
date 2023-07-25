const express = require('express')
const { Router } = express
const router = new Router()
const passport = require('passport')
// const githubPassport = require('../passport/github')


const { register, loginValidate, logout } = require ('./../controllers/authController')

// router.post('/register', register)
router.post('/register',
    passport.authenticate('register',
    {failureRedirect:'/user/failedRegister'}), (req, res) =>{
        console.log('usuario registrado')
        req.session.user = req.user
        res.status(200).redirect('/products')
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/'}), (req, res) => {
    req.session.user = req.user

    res.status(200).redirect('/products')
})

router.get('/failedRegister', (req, res) => {
    res.send('Fallo el registro de usuario')
})

router.get('/auth/github',
    passport.authenticate('auth-github',
    { scope: ['user:email'] })
);

router.get('/auth/github/callback',
    passport.authenticate('auth-github',
        { failureRedirect: '/'}),  (req, res) => {
            req.session.user = req.user
            res.status(200).redirect('/products')
    });

// router.post('/login', loginValidate)
router.get('/logout', logout)

module.exports = router
