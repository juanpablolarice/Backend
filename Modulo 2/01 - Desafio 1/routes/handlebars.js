const express = require('express')
const { Router } = express
const router = new Router()

function auth(req, res, next){
    console.log(req.session.role)
    if(req.session.role == 'Admin'){
        next()
    }
    return res.status(401).send('Error en la autenticación')
}

// const { register, loginValidate, logout } = require ('./../controllers/userController')
const { getCartById } = require ('./../controllers/cartController')
const { showAllProducts } = require ('./../controllers/productController')

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
router.get('/products', showAllProducts)

router.get('/products/:id', async (req, res) => {
    let { id } = req.params
    // let product = await Service.getById(id)
    let product = await Product.findOne({ _id: id })
    // res.send(product)
    // console.log(product)

    res.render('productDetail',  { product })
    // if(req.body.error)
    //     return res.status(500).send({error});
    // try{
    //     // lean() Se utiliza para poder manipular en la view
    //     const product = await Product.find({ _id: new ObjectId(toString(req.params.id))})//.lean().then((result, err) => {
    //         // return product
    //         // console.log("ROUTE: " + result)
    //         // res.render('productDetail', { products: result})
    //     // })
    //     // const user = await Product.find({ _id: id });
    //     console.log("ROUTE: product" + product);
    //     res.render('productDetail', { products: product})
    // }catch(err){
    //     console.log(err)
    // }
});

// CARTS
// router.get('/cart/:id', getCartById) //async (req, res) => {
//     const cart = getCartById()
//
//
//
//     let { id } = req.params
//     // const aux = id
//     // const idString = id;
//     // const idObject = new mongoose.Types.ObjectId(id);
//     // if (mongoose.Types.ObjectId.isValid(idObject)) {
//     //     console.log('El ID es válido.');
//     // } else {
//     //     console.log('El ID no es válido.');
//     // }
//     const cart = await Cart.findById(id).populate('products.product')
//     console.log(cart)
//     //
//     // let products = cart.products.map((item) => {
//     //     return {
//     //         _id: item.product._id,
//     //         title: item.product.title,
//     //         description: item.product.description,
//     //         code: item.product.code,
//     //         price: item.product.price,
//     //         status: item.product.status,
//     //         stock: item.product.stock,
//     //         category: item.product.category,
//     //         thumbnails: item.product.thumbnails,
//     //         quantity: item.quantity
//     //     };
//     // });
//
//     res.render('cart',  JSON.stringify(cart, null, '\t'))
// })



module.exports = router
