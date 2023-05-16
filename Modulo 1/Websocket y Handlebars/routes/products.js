const express = require('express')
const { Router } = express
const ProductManager = require('../ProductManager');
const router = new Router()
// let products = []
const path = require("path")
const root = path.dirname(__dirname)

router.get('/', async (req, res) => {
    let products = new ProductManager(root + '/products.json')
    let prod = await products.getProducts()
    res.send(prod)
});
router.get('/:id', async (req, res) => {
    let products = new ProductManager(root + '/products.json')
    let prod = await products.getProductById(req.params.id)

    res.send(prod)
});

router.post('/', async (req, res) => {
    let products = new ProductManager(root + '/products.json')
    let createProduct = await products.addProduct(req.body.title, req.body.description, req.body.code, req.body.price, req.body.status, req.body.stock, req.body.thumbnails)

    res.send({data:req.body, message:'Producto guardado correctamente'})
});

router.delete('/:id', async (req, res) => {
    let id= req.params.id
    let products = new ProductManager(root + '/products.json')
    let deleteProduct = await products.deleteProduct(id)

    res.send({message: deleteProduct})
})

router.put('/:id', async (req, res) => {
    let id = req.params.id
    let product = req.body
    let products = new ProductManager(root + '/products.json')
    let updateProduct = await products.updateProduct(id, product)

    res.send({message: updateProduct})
})

module.exports = router
