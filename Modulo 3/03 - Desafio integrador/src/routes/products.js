const express = require('express')
const { Router } = express
const router = new Router()
const { showAllProducts, showProductById, editProduct, updateProduct, createProduct, storeProduct, deleteProduct } = require('./../controllers/productController')
const { sessionActive, isAdmin } = require('../middlewares/auth')
// const { authMiddleware, isAdmin } = require('../services/auth.services')

router.get('/products', sessionActive, showAllProducts)
router.get('/api/products/create', isAdmin, createProduct)
router.get('/api/product/:pid/edit', isAdmin, editProduct)
router.post('/api/product/:pid/update', isAdmin, updateProduct)
router.post('/products/store', isAdmin, storeProduct)
router.delete('/api/products/:pid', isAdmin, deleteProduct)

module.exports = router