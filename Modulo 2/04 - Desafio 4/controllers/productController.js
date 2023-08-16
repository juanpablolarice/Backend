const Product = require('../dao/models/product')
const { showAllProductsService } = require('../services/products.services')

const showAllProducts = async (req, res) => {    
    const { category, status, limit, sort, page } = req.query    
    const [products, rest] = await showAllProductsService(category, status, limit, sort, page)
    
    return res.status(200).render('products', { 
        products, 
        pagination: rest,
        user: req.session.user
    });
}

module.exports = { showAllProducts }
