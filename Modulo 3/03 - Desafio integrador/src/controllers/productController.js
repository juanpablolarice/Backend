// const Product = require('../services/dao/mongo/classes/product.class')
const { productClass } = require('../services/factory')
const ProductModel = require('../services/dao/mongo/models/product.model')
const Cart = require('../services/dao/mongo/classes/cart.class')
const CartModel = require('../services/dao/mongo/models/cart.model')



const getAll = async (req, res) => {    
    try {
        const payload = await productClass.getAll()
        console.log("PRODUCT CONTROLLER: getAll")
        console.log("PAYLOAD: " + payload.error)
    
        res.status(200).send({ payload: payload})
    } catch (error) {
        return { error: 'Se produjo un error inesperado' }
    }
}

const showAllProducts = async (req, res) => {    
    // const productClass = new Product()
    console.log("PRODUCT CONTROLLER: showAllProducts")
    const { category, status, limit, sort, page } = req.query    
    const [products, rest] = await productClass.allProducts(category, status, limit, sort, page)
    const cartClass = new Cart()    
    const cart = await cartClass.getCartById(req.session.user.cart)

    if(req.session.user.role=="Admin"){
        isAdmin = true
    }else{
        isAdmin = false
    }
    
    // return res.status(200).send({ 
    //     products: products, 
    //     cart: cart.products,
    //     pagination: rest,
    //     user: req.session.user,
    //     isAdmin: isAdmin
    // });
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
        const product = await productClass.getProductById(pid)
        console.log("PRODUCT CONTROLLER: editProduct")
        
        if(product){
            res.send({payload: product})            
        }else{
            res.status(500).json({
                status: 'Error',
                msg: 'No se pudo obtener la sesión del usuario',
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            error: error,
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
}

const editProductShow = async (req, res) => {
    try {
        const { pid } = req.params    
        const product = await productClass.getProductById(pid)
        console.log("PRODUCT CONTROLLER: editProductShow")
        console.log("EDIT: " + product)
        
        if(product){
            // res.send({payload: product})
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
            res.status(200).render('editProduct',  { product: productHandlebars })
        }else{
            res.status(500).json({
                status: 'Error',
                msg: 'No se pudo obtener la sesión del usuario',
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            error: error,
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
    // try {
    //     const { pid } = req.params
    //     const productClass = new Product()
    //     console.log("PRODUCT ID: " + pid)
    //     const product = await productClass.getProductById(pid)
    //     console.log("PRODUCT: " + product)
    //     if(product){
    //         let thumbs = product.thumbnails.toString()            
    //         productHandlebars = {
    //             _id: pid, 
    //             title: product.title,
    //             description: product.description,
    //             code: product.code,
    //             price: product.price,
    //             status: product.status,
    //             stock: product.stock,
    //             category: product.category,
    //             thumbnails: thumbs
    //         }
    //         console.log("EDIT PRODUCT")
    //         return res.status(200).send({
    //             // isAdmin:req.session.user.role==="Admin", 
    //             product: productHandlebars
    //             // pid: pid
    //         });
    //         // return res.status(200).render('editProduct', {
    //         //     isAdmin:req.session.user.role==="Admin", 
    //         //     product: productHandlebars,
    //         //     pid: pid
    //         // });
    //     }else{

    //     }
    // } catch (error) {
        
    // }
}

const updateProduct = async (req, res) => {
    const { pid } = req.params
    let product = req.body
    const productClass = new Product() 
    let [errors, status] = await productClass.validateProduct(product)
    product.thumbnails = product.thumbnails.split(",")
    if(errors.length>0){
        return res.status(500).render('editProduct', { pid, product, message: errors, status});
    }else{
        let [message, status] = await productClass.updateProduct(pid, product)        
        return res.status(200).render('editProduct', { pid, product, message, status});        
    }
}

const showProductById = async (req, res) => {
    const { pid } = req.params    
    const product = await productClass.getProductById(pid)
    console.log("PRODUCT CONTROLLER: showProductById")
    
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
        res.status(200).render('productDetail',  { product: productHandlebars })
        // res.render('productDetail',  { product: product })
    }else{
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudo obtener la sesión del usuario',
        })
    }
}

const getProductById = async (req, res) => {
    const { pid } = req.params    
    const product = await productClass.getProductById(pid)
    console.log("PRODUCT CONTROLLER: getProductById")
    
    if(product){
        res.send({payload: product})
        // res.render('productDetail',  { product: product })
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
    console.log("PRODUCT CONTROLLER: storeProduct")

    let [errors, status] = await productClass.validateProduct(product)
    product.thumbnails = product.thumbnails.split(",")
    if(errors.length>0){
        return res.status(500).render('createProduct', { product, message: errors, status});
    }else{
        let [message, status] = await productClass.storeProduct(product)
        return res.status(200).render('createProduct', { product, message, status});
    }
}

const deleteProduct = async (req, res) => {
    try {
        let {pid} = req.params
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
module.exports = { getAll, showAllProducts, editProduct, editProductShow, updateProduct, showProductById, getProductById, createProduct, storeProduct, deleteProduct }
