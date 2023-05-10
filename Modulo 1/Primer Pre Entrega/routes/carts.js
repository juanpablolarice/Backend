const express = require('express')
const { Router } = express
const CartManager = require('../CartManager');
const router = new Router()
// let products = []
const path = require("path")
const root = path.dirname(__dirname)

router.get('/', async (req, res) => {
    let carts = new CartManager()
    // let prod = await products.getProducts()
    res.send(carts)
});
// router.get('/:id', async (req, res) => {
//     let products = new CartManager(root + '/products.json')
//     let prod = await products.getProductById(req.params.id)
//
//     res.send(prod)
// });

router.post('/', async (req, res) => {
    let carts = new CartManager(root + '/carts.json')
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
