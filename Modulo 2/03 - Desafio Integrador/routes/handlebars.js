const express = require('express')
const { Router } = express
const router = new Router()

function auth(req, res, next){
    if(req.session.user){
        console.log(req.session.user)
        if(req.session.user.role == 'User' || req.session.user.role == 'Admin'){
            console.log(req.session.user.role)
            next()
        }else{
            console.log('No coincide la sesion')
            return res.redirect('login')//, {error: 'No tienes permiso suficiente'})//.send('Error en la autenticación')
        }
    // }else{
    }else{
        return res.redirect('login')
    }
}

// const { register, loginValidate, logout } = require ('./../controllers/userController')
const { getCartById } = require ('./../controllers/cartController')
const { showAllProducts } = require ('./../controllers/productController')

router.get('/', async (req, res) => {
    res.redirect('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
})
router.get('/login', async (req, res) => {
    res.render('login')
})
router.get('/profile', auth, async (req, res) => {
    res.render('profile')
})

// PRODUCTS
router.get('/products', auth, showAllProducts)

router.get('/products/:id', auth, async (req, res) => {
    let { id } = req.params
    let product = await Product.findOne({ _id: id })

    res.render('productDetail',  { product })
});

module.exports = router
