const express = require('express')
const { Router } = express
const router = new Router()
const { showAllProducts, showProductById } = require('./../controllers/productController')
const { authMiddleware } = require('../services/auth.services')

router.get('/products', authMiddleware, showAllProducts)
router.get('/products/:id', authMiddleware, showProductById)

module.exports = router