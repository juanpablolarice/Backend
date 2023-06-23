const express = require('express')
const path = require('path')
const app = express()
const handlebars = require('express-handlebars')

const PORT = 8080
const http = require('http')
const server = http.createServer(app)
const MongoManager = require('./dao/db')
const dbManager = new MongoManager('mongodb+srv://JuanLarice:Coder2023@cluster0.z95xyv3.mongodb.net/');
const Cart = require('./dao/models/cart')
const Product = require('./dao/models/product')

const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')
const routesHandlebars = require('./routes/handlebars')

server.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
    dbManager.connect()
})

app.engine('handlebars', handlebars.engine() )
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars' )

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))
app.use('/', routesProducts)
app.use('/', routesHandlebars)
app.use('/api/carts', routesCarts)
