const Product = require('../dao/models/product')
const { showAllProductsService, getProductById } = require('../services/products.services')

const showAllProducts = async (req, res) => {    
    const { category, status, limit, sort, page } = req.query    
    const [products, rest] = await showAllProductsService(category, status, limit, sort, page)
    
    return res.status(200).render('products', { 
        products, 
        pagination: rest,
        user: req.session.user
    });
}

const showProductById = async (req, res) => {    
    const { id } = req.params 
    const product = await getProductById(id)
    console.log("ProductsController: " + product.title)

    res.render('productDetail',  { product })
}

module.exports = { showAllProducts, showProductById }
