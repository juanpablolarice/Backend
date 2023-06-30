const Product = require('../dao/models/product')

const getAll = async (req, res) => {
    const { category, status, limit, sort, page } = req.query
    let products = ''

    try {
        if (category && status) {
            products = await Product.paginate({ $or: [{ category: category }, { status: status || true }] }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else if (category) {
            products = await Product.paginate({ category: category }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else if (status) {
            products = await Product.paginate({ status: status || true }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else {
            products = await Product.paginate({}, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        }
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send({ error: 'Se produjo un error inesperado' })
    }
}

const createProduct = async (req, res) => {
    let {title, description, category, code, price, status, stock, thumbnails} = req.body

    try {
        let result  = await Product.create({
            title,
            description,
            code,
            price,
            category,
            status,
            stock,
            thumbnails
        })
        res.status(200).json({
            status: 'success',
            msg:'Producto creado correctamente',
        })
    } catch (e) {
        res.status(500).json({
            status: 'error',
            msg: 'Ocurrió un error inesperado, no se pudo crear el producto.',
        });
    }
}

const deleteProductById = async (req, res) => {
    Product.deleteOne({'_id': req.params.id}).then((result, err) => {
        res.status(200).json({
            status: 'success',
            msg:'Producto eliminado correctamente.',
        })
    }).catch((err) => {
        return res.status(500).json({
            status: 'error',
            msg: 'Ocurrió un error inesperado. No se pudo eliminar el producto.',
        })
    })
}

// HANDLEBARS
const showAllProducts = async (req, res) => {
    const { category, status, limit, sort, page } = req.query
    let dataProducts = ''

    try {
        if (category && status) {
            dataProducts = await Product.paginate({ $or: [{ category: category }, { status: status || true }] }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else if (category) {
            dataProducts = await Product.paginate({ category: category }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else if (status) {
            dataProducts = await Product.paginate({ status: status || true }, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        } else {
            dataProducts = await Product.paginate({}, {
                limit:limit || 10,
                sort: { price: sort || 'asc' },
                page: page || 1
            })
        }
        let  products = dataProducts.docs.map((item) => {
            return {
                _id: item._id,
                title: item.title,
                description: item.description,
                code: item.code,
                price: item.price,
                status: item.status,
                stock: item.stock,
                category: item.category,
                thumbnails: item.thumbnails
            };
        });
        const { docs, ...rest } = dataProducts;

        return res.status(200).render('products', { products, pagination: rest});//, links });
    } catch (err) {
        res.status(500).send({ error: 'Se produjo un error inesperado' })
    }
}

module.exports = { getAll, showAllProducts, deleteProductById, createProduct }
