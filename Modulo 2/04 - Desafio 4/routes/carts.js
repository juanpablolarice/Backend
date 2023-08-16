const express = require('express')
const { Router } = express
const router = new Router()

const { getAll, getCartById, createCart, updateProductQuantity, addProductToCart, deleteCart, deleteProductFromCart } = require('./../controllers/cartController')

router.get('/', getAll)
router.get('/:cid', getCartById)
router.post('/', createCart)

// ACTUALIZO LA CANTIDAD DE PRODUCTOS :PID EN EL CARRO :CID
router.put('/:cid/product/:pid', updateProductQuantity)

// ACTUALIZO EL CARRO CON EL ARREGLO DE PRODUCTOS INGRESADO
router.put('/:cid', addProductToCart)
router.delete('/:cid', deleteCart)
router.delete('/:cid/product/:pid', deleteProductFromCart)

module.exports = router
