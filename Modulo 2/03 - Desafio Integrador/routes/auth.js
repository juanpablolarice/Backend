const express = require('express')
const { Router } = express
const router = new Router()
const passport = require('passport')
const userModel = require('../dao/models/user')

const { register, loginValidate, logout } = require ('./../controllers/authController')

router.post('/register',
    passport.authenticate('register',
    {failureRedirect:'/registerFail'}), (req, res) =>{        
        req.session.user = req.user
        
        res.status(200).redirect('/products')
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/loginFail'}), (req, res) => {        
    req.session.user = req.user
    
    res.status(200).redirect('/products')
})
router.get('/loginFail', (req, res) => {
    res.render('loginFail')
})
router.get('/registerFail', (req, res) => {
    res.render('registerFail')
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

router.get('/logout', logout)

module.exports = router
