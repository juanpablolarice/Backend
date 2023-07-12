const express = require('express')
const path = require('path')
const app = express()
const handlebars = require('express-handlebars')
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const MongoStore = require('connect-mongo')
const passport = require('passport')

const PORT = 8080
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const MongoManager = require('./dao/db')
const CONFIG = require('./config/constants.js')
const dbManager = new MongoManager('mongodb+srv://JuanLarice:Coder2023@cluster0.z95xyv3.mongodb.net/');
const Cart = require('./dao/models/cart')
const Product = require('./dao/models/product')

const routesAuth = require('./routes/auth')
const routesSessions = require('./routes/sessions')
const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')
const routesHandlebars = require('./routes/handlebars')

// app.engine('handlebars', handlebars.engine() )
app.engine('handlebars', handlebars.engine({
    helpers: {
        sayHello: function () { return "Hello"; },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        }
    },
partialsDir: ['views/partials/'],
defaultLayout: 'main'
}));
// handlebars.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars' )

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    store: MongoStore.create({
        mongoUrl: CONFIG.DB
    }),
    secret:'secretCoder',
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname+'/public'))

app.use('/', routesAuth)
// app.use('/', routesProducts)
app.use('/', routesHandlebars)
app.use('/api/carts', routesCarts)
app.use('/api/sessions', routesSessions)


io.on('connection', async (socket)=>{
    console.log("Cliente conectado")

    // socket.emit('products', products)

    socket.on('addProduct', (data)=>{
    //   // let response = prod.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.thumbnails)
      console.log("Add product in index.js")
    })
    //
    // socket.on('deleteProduct', async (data) => {
    //     // let response = await prod.deleteProduct(data)
    //     console.log(response)
    // })
})

server.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
    dbManager.connect()
})
