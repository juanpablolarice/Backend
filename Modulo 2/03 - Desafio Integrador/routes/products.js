const express = require('express')
const { Router } = express
const router = new Router()
const  ObjectId = require('mongodb').ObjectId;

const path = require("path")
const root = path.dirname(__dirname)

const Product = require('./../dao/models/product')
const { getAll, showAllProducts, deleteProductById, createProduct } = require('./../controllers/productController')

router.get('/', getAll)
router.post('/', createProduct)
router.delete('/:id', deleteProductById)

module.exports = router
