const express = require('express')
const { Router } = express
const router = new Router()

const path = require("path")
const root = path.dirname(__dirname)

const Cart = require('./../dao/models/cart')
const Product = require('./../dao/models/product')

router.get('/', async (req, res) => {
    try {
        let carts  = await Cart.find({}).populate('products.product')
        res.send({carts:carts})
    } catch (e) {
        return "error"
    }
})

router.post('/', async (req, res) => {
    // return "sadf"
    try {
        let { products } = req.body
        let result  = await Cart.create({
            products
        })
        return res.status(200).json({
            cart: result._id,
            status: 'success',
            msg: 'El carro se creó correctamente',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo crear correctamente',
        });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params
        let cart = await Cart.findOne({_id:cid}).populate("products.product")

        res.send(cart).status(200)
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo actualizar correctamente',
        });
    }
});

// ACTUALIZO LA CANTIDAD DE PRODUCTOS :PID EN EL CARRO :CID
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        let cart = await Cart.findOneAndUpdate(
            { _id: cid, 'products.product': pid },
            {
                $inc: {
                    'products.$.quantity': quantity,
                }
            },
        )
        // Si el producto no esta en el carro se agrega
        if(!cart){
            let cart = await Cart.findOne({ _id: cid})
            cart.products.push({product: pid, quantity: quantity})
            let result = await Cart.updateOne({ _id: cid}, cart)
        }
        return res.status(200).json({
            status: 'success',
            msg: 'El carro se actualizó correctamente',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo actualizar correctamente',
        });
    }
});

// ACTUALIZO EL CARRO CON EL ARREGLO DE PRODUCTOS INGRESADO
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        let cart = await Cart.findOne({ _id: cid})
        let products = req.body

        products.products.map(function (product) {
            cart.products.push({product: product.product, quantity: product.quantity})
        })
        let result = await Cart.updateOne({ _id: cid}, cart)

        return res.status(200).json({
            status: 'success',
            msg: 'El carro se actualizó correctamente',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo actualizar correctamente',
        });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        await Cart.findOneAndDelete({ _id: cid})

        return res.status(200).json({
            status: 'success',
            msg: 'El carro se eliminó correctamente',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo eliminar correctamente',
        });
    }
})
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        console.log("CID: " + cid + " - PID: " + pid)
        // await Cart.findOneAndDelete({ _id: cid})
        // let cart = await Cart.findOneAndDelete(
        //     { _id: cid, 'products.product': pid }
        // )
        // let cart = Cart.updateOne({ _id: cid, 'products.product': pid }, { $pull: { products: { product: pid }}})
        let cart = await Cart.findOneAndUpdate(
            { _id: cid },
            { "$pull": { "products": { "product": pid } } },
            { safe: true, multi: false }
        );
        // let cart = cart.findOne({ _id: cid }).populate('products').exec(function (err, doc) {
        //     console.log(doc.product.title); // Dr.Seuss
        //     console.log(doc.depopulate('product'));
        //     console.log(doc.product); // '5144cf8050f071d979c118a7'
        // })
        // let cart = await Cart.findOne({ _id: cid, 'products.product': pid })//.populate({products})
        // console.log(cart)
        // let cart = await Cart.findOneAndUpdate(
        //     { _id: cid, 'products.product': pid },
        //     {
        //         $pull: {
        //             'products.$._id': pid,
        //             // 'products.$.product': pid,
        //         }
        //     },
        // )

        // res.send({message: deleteProduct})
        return res.status(200).json({
            status: 'success',
            msg: 'Se eliminó el producto del carro correctamente',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'No se pudo eliminar el producto correctamente',
        });
    }
})
//
// router.put('/:id', async (req, res) => {
//     let id = req.params.id
//     let product = req.body
//     let products = new CartManager(root + '/products.json')
//     let updateProduct = await products.updateProduct(id, product)
//
//     res.send({message: updateProduct})
// })

module.exports = router
