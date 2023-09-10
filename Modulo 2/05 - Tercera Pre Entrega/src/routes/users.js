const express = require('express')
const { Router } = express
const router = new Router()

function auth(req, res, next){
    if(req.session.user){
        if(req.session.user.role == 'User' || req.session.user.role == 'Admin'){
            next()
        }else{
            return res.redirect('login')
        }
    }else{
        return res.redirect('login')
    }
}

const { getCartById, getMyCart } = require ('../controllers/cartController')
const { showAllProducts } = require ('../controllers/productController')


router.get('/profile', auth, async (req, res) => {
    res.render('profile')
})


module.exports = router
