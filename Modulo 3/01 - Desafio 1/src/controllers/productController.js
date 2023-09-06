const Product = require('../dao/mongo/classes/product.class')
const ProductModel = require('../dao/mongo/models/product.model')
const Cart = require('../dao/mongo/classes/cart.class')
const CartModel = require('../dao/mongo/models/cart.model')

const showAllProducts = async (req, res) => {    
    const productClass = new Product()
    const { category, status, limit, sort, page } = req.query    
    const [products, rest] = await productClass.allProducts(category, status, limit, sort, page)
    const cartClass = new Cart()    
    const cart = await cartClass.getCartById(req.session.user.cart)
            
    return res.status(200).render('products', { 
        products, 
        cart: cart.products,
        pagination: rest,
        user: req.session.user,
        isAdmin:req.session.user.role==="Admin"
    });
}

const showProductById = async (req, res) => {
    const { id } = req.params
    const productClass = new Product()
    const product = await productClass.getProductById(id)
    
    res.status(500).json({
        status: 'Error',
        msg: 'No se pudo obtener la sesión del usuario',
    })
    if(product){
        res.render('productDetail',  { product })
    }else{
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
}

const createProduct = async (req, res) => {
    return res.status(200).render('createProduct', {isAdmin:req.session.user.role==="Admin"});
}

const storeProduct = async (req, res) => {
    let product = req.body
    const productClass = new Product()
    const result = await productClass.storeProduct(product)

    return res.status(200).render('createProduct', { product, result});
    return res.status(200).json({
        status: result
    });
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    // const productClass = new Product()    
    // const result = await productClass.storeProduct(title, description, code, price, status, stock, category, thumbnails)
    // const newProduct = await productClass.storeProduct(product)

    return res.status(200).render('createProduct', {isAdmin:req.session.user.role==="Admin"});
    // return res.status(200).json({
    //     status: result
    // });
    // return productClass.storeProduct()
}

module.exports = { showAllProducts, showProductById, createProduct, storeProduct }
