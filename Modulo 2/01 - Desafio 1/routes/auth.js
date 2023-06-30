const express = require('express')
const { Router } = express
const router = new Router()

const { register, loginValidate, logout } = require ('./../controllers/authController')

router.post('/register', register)

router.post('/login', loginValidate)

router.get('/logout', logout)

module.exports = router
