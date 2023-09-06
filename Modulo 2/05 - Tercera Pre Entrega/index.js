const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const handlebars = require('express-handlebars')
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const MongoStore = require('connect-mongo')
const passport = require('passport')
const initializePassport = require('./src/config/passport')
const dotenv = require('dotenv').config()


const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const MongoManager = require('./src/dao/mongo/db')
const dbManager = new MongoManager(process.env.DB);
const Cart = require('./src/dao/mongo/models/cart.model')
const Product = require('./src/dao/mongo/models/product.model')

const routesAuth = require('./src/routes/auth')
const routesSessions = require('./src/routes/sessions')
const routesProducts = require('./src/routes/products')
const routesCarts = require('./src/routes/carts')
const routesUsers = require('./src/routes/users')


app.engine('handlebars', handlebars.engine({
    helpers: {
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        }
    },
    partialsDir: ['src/views/partials/'],
    defaultLayout: 'main'
}));
// handlebars.registerHelper("compare", (ctx, args) => {
//     console.log("ONE: " + args[0])
//     console.log("TWO: " + args[1])
//     if (args[0] === args[1]) {
//         return true
//     } else {
//         return false
//     }
// });

app.set('views', __dirname+'/src/views')
app.set('view engine', 'handlebars' )

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DB
    }),
    secret:'secretCoder',
    resave:true,
    saveUninitialized:true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({origin:'http://localhost:5500', methods:['GET', 'POST', 'PUT']}))
app.use(express.static(__dirname+'/public'))

app.use('/', routesAuth)
app.use('/', routesProducts)
app.use('/', routesUsers)
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

server.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 8080')
    dbManager.connect()
})
