const express = require('express')
const path = require('path')
const ProductManager = require('./ProductManager');

const app = express()

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/products?:limit', async (req, res) => {
    let products = new ProductManager('./products.json')
    let prod = await products.getProducts()
    if(req.query.limit === undefined){
        res.send(prod)
    }else{
        let filter = []
        if(req.query.limit > prod.length){
            res.send(prod)
        }else{
            for (let i = 0; i < req.query.limit; i++) {
                filter.push(prod[i])
            }
            res.send(filter)
        }
    }
})

app.get('/products/:id', async (req, res) => {
    let products = new ProductManager('./products.json')
    const id = req.params.id
    let prod = await products.getProductById(id)
    res.send(prod)
})

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080')
})
