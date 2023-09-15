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

    if(req.session.user.role=="Admin"){
        isAdmin = true
    }else{
        isAdmin = false
    }
    
    return res.status(200).render('products', { 
        products, 
        cart: cart.products,
        pagination: rest,
        user: req.session.user,
        isAdmin: isAdmin
    });
}

const editProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const productClass = new Product()
        const product = await productClass.getProductById(pid)
        if(product){
            let thumbs = product.thumbnails.toString()            
            productHandlebars = {
                _id: pid, 
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category,
                thumbnails: thumbs
            }
            
            return res.status(200).render('editProduct', {
                isAdmin:req.session.user.role==="Admin", 
                product: productHandlebars,
                pid: pid
            });
        }else{

        }
    } catch (error) {
        
    }
}

const updateProduct = async (req, res) => {
    const { pid } = req.params
    let product = req.body
    product.thumbnails = product.thumbnails.split(",")
    console.log("Product: " + product)
    const productClass = new Product()
    const result = await productClass.updateProduct(pid, product)    
    return res.status(200).render('editProduct', { product, pid, result});    
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
        res.render('productDetail',  { product: productHandlebars })
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

    let [errors, status] = await productClass.validateProduct(product)
    product.thumbnails = product.thumbnails.split(",")
    if(errors.length>0){
        return res.status(500).render('createProduct', { product, message: errors, status});
        console.log("Vuelve al form")
    }else{
        let [message, status] = await productClass.storeProduct(product)
        return res.status(200).render('createProduct', { product, message, status});
        console.log("Crea el producto")
    }
}

const deleteProduct = async (req, res) => {
    try {
        let {pid} = req.params
        console.log("ProductoController")
        const productClass = new Product()
        const result = await productClass.deleteProduct(pid)
        if(result){
            res.status(500).json({
                status: 'success',
                msg: 'El producto se eliminó correctamente',
            })
        }else{
            res.status(500).json({
                status: 'Error',
                msg: 'No se pudo eliminar el producto',
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudo eliminar el producto',
        })
    }    
}
module.exports = { showAllProducts, editProduct, updateProduct, showProductById, createProduct, storeProduct, deleteProduct }
