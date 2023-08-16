const express = require('express')
const { Router } = express
const router = new Router()
const { showAllProducts } = require('./../controllers/productController')
const { authMiddleware } = require('../controllers/authController')

router.get('/products', authMiddleware, showAllProducts)

module.exports = router