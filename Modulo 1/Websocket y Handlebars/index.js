const express = require('express')
const path = require('path')
const app = express()
const handlebars = require('express-handlebars')
const ProductManager = require('./ProductManager');
const PORT = 8080
const http = require('http')
const server = http.createServer(app)

const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')
const routesHandlebar = require('./routes/handlebars')

const {Server} = require('socket.io')
const io = new Server(server)

app.engine('handlebars', handlebars.engine() )
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars' )

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use('/static', express.static('public'))
app.use('/', routesHandlebar)
app.use(express.static(__dirname+'/public'))
app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)

io.on('connection', async (socket)=>{
    console.log("Cliente conectado")
    let prod = new ProductManager('./products.json')
    let products = await prod.getProducts()
    socket.emit('products', products)

    socket.on('addProduct', (data)=>{
      let response = prod.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.thumbnails)
      console.log(response)
    })

    socket.on('deleteProduct', async (data) => {
        let response = await prod.deleteProduct(data)
        console.log(response)
    })
})

server.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
})
