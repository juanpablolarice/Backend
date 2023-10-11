const express = require('express')
const { Router } = express
const router = new Router()
const { sessionActive, isAdmin, isUser, userForCart } = require ('../middlewares/auth')

// function auth(req, res, next){
//     if(req.session.user){
//         if(req.session.user.role == 'User' || req.session.user.role == 'Admin'){
//             next()
//         }else{
//             return res.redirect('login')
//         }
//     }else{
//         return res.redirect('login')
//     }
// }

const { getCartById, getMyCart } = require ('../controllers/cartController')
const { showAllProducts } = require ('../controllers/productController')


router.get('/profile', sessionActive, async (req, res) => {
    res.render('profile')
})

router.get('/chat', isUser, async (req, res) => {
    res.render('chat')
})

module.exports = router
