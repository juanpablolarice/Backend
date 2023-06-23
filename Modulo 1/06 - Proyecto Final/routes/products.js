const express = require('express')
const { Router } = express
const router = new Router()
const  ObjectId = require('mongodb').ObjectId;

const path = require("path")
const root = path.dirname(__dirname)

const Product = require('./../dao/models/product')
const ProductService = require('./../services/products')
const Service = new ProductService()

router.get('/', async (req, res) => {
    const { page, limit, sort, query } = req.query;

    try{
        const dataProducts = await Service.getAll(page, limit, sort, query);
        console.log("QUERY routes: " + query)
        return res.status(200).json({
            status: 'success',
            payload:dataProducts.docs,
            totalPages:dataProducts.totalPages,
            prevPage:dataProducts.prevPage,
            nextPage:dataProducts.nextPage,
            page:dataProducts.page,
            hasPrevPage:dataProducts. hasPrevPage,
            hasNextPage:dataProducts.hasNextPage,
            prevLink:dataProducts.hasPrevPage?`http://localhost:8080/?page=${dataProducts.prevPage} ` : null,
            nextLink:dataProducts.hasNextPage?`http://localhost:8080/?page=${dataProducts.nextPage} `: null,
        });
    }catch(err){
        return res.status(500).json({
            status: 'error',
            msg: 'Ocurrió un error inesperado :(',
            data: {},
        });
    }
});

router.post('/', async (req, res) => {
    let {title, description, category, code, price, status, stock, thumbnails} = req.body
    let result  = await Product.create({
        title,
        description,
        category,
        code,
        price,
        status,
        stock,
        thumbnails
    })
    res.send({data:req.body, message:'Producto guardado correctamente'})
});
//
router.delete('/:id', async (req, res) => {
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
})
//
// router.put('/:id', async (req, res) => {
//
//     res.send({message: updateProduct})
// })


// HANDLEBARS
router.get('/products', async (req, res) => {
    try{
        const { page, limit, sort, query } = req.query;
        const dataProducts = await Service.getAll(page, limit, sort, query);

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
    }catch(err){
        return res.status(500).json({
            status: 'error',
            msg: 'Ocurrió un error inesperado.',
            data: {},
        });
    }
});

router.get('/products/:id', async (req, res) => {
    let { id } = req.params;
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



module.exports = router
