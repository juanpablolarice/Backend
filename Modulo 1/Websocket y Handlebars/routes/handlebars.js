const express = require('express')
const {Router} = express
const router = new Router()
const ProductManager = require('../ProductManager');
const path = require("path")
const root = path.dirname(__dirname)

router.get('/', async (req, res)=>{
    // console.log("entro23")
    // console.log(__dirname)
    let prod = new ProductManager(root + '/products.json')
    // let prod = new ProductManager('/products.json')
    let products = await prod.getProducts()

    res.render('index', {products:products})
})
router.get('/realtimeproducts', async (req, res) => {
    let prod = new ProductManager(root + '/products.json')
    let products = await prod.getProducts()

    res.render('realtimeproducts', {products:products})
})

module.exports = router
