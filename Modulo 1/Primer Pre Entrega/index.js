const express = require('express')
const path = require('path')
// const ProductManager = require('./ProductManager');
const app = express()
const PORT = 8080

// const routesProducts = require('./routes/products-PRE-ENTREGA')
const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')

// function mid1(req, res, next){
//     req.data1 = 'Un dato X'
//     next()
// }
// SEGUIR EN 1:39 min
// app.use(function(req, res, next){
//     console.log("Time: " + Date.now())
//     next()
// })

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static('public'))

app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
})
