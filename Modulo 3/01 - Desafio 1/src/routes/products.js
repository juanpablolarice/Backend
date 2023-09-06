const express = require('express')
const { Router } = express
const router = new Router()
const { showAllProducts, showProductById, createProduct, storeProduct } = require('./../controllers/productController')
const { authMiddleware, isAdmin } = require('../services/auth.services')

router.get('/products', authMiddleware, showAllProducts)
router.get('/products/create', isAdmin, createProduct)
// router.get('/products/create', (req, res) => {
//     res.status(200).json({
//         status: 'Error',
//         msg: 'Error',
//     })
// })
// router.get('/products/:id', authMiddleware, showProductById)
router.post('/products/store', isAdmin, storeProduct)

module.exports = router