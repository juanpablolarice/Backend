const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080


const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static('public'))

app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
})
