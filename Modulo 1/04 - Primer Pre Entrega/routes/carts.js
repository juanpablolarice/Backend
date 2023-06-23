const express = require('express')
const { Router } = express
const CartManager = require('../CartManager');
// const ProductManager = require('../ProductManager');
const router = new Router()
// let products = []
const path = require("path")
const root = path.dirname(__dirname)

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let carts = new CartManager()
    let cart = await carts.getCartById(id)
    console.log(cart)
    res.send(cart)
});
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    // console.log("cartId: " + cartId + " - productId: " + productId)
    let cart = new CartManager()
    let product = await cart.saveProductByCart(cartId, productId)


    // let prod = await products.getProductById(req.params.id)

    res.send(product)
});

router.post('/', async (req, res) => {
    let carts = new CartManager()
    let createCart = await carts.createCart()

    res.send({message:'Carrito creado correctamente'})
});

// router.delete('/:id', async (req, res) => {
//     let id= req.params.id
//     let products = new CartManager(root + '/products.json')
//     let deleteProduct = await products.deleteProduct(id)
//
//     res.send({message: deleteProduct})
// })
//
// router.put('/:id', async (req, res) => {
//     let id = req.params.id
//     let product = req.body
//     let products = new CartManager(root + '/products.json')
//     let updateProduct = await products.updateProduct(id, product)
//
//     res.send({message: updateProduct})
// })

module.exports = router
