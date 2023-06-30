const Cart = require("../dao/models/cart");

const getAll = async (req, res) => {
    try{
        const carts = await Cart.find().populate('products.product')
        res.status(200).send(carts)
    }catch (error) {
        res.status(500).json({
            status: 'Error',
            msg: 'No se pudieron obtener los carros',
        })
    }
}

const getCartById = async (req, res) => {
    const { cid } = req.params
    try {
        const cartSelectedPopulated = await Cart.findById(cid).populate('products.product')
        res.status(200).send(cartSelectedPopulated)
        // res.status(200).send(JSON.stringify(cartSelectedPopulated, null, '\t'))
    } catch (error) {
        res.status(404).send({ error: 'Error al intentar encontrar carrito del usuario' })
    }
}

const createCart = async (req, res) => {
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
}

const addProductToCart = async (req, res) => {
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
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo actualizar correctamente',
        })
    }
}

const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        let cart = await Cart.findOneAndUpdate(
            { _id: cid, 'products.product': pid },
            {
                $inc: {
                    'products.$.quantity': quantity || 1,
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
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo actualizar correctamente',
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        await Cart.findOneAndDelete({ _id: cid})

        return res.status(200).json({
            status: 'success',
            msg: 'El carro se eliminó correctamente',
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'El carro no se pudo eliminar correctamente',
        })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
                
        let cart = await Cart.findOneAndUpdate(
            { _id: cid },
            { "$pull": { "products": { "product": pid } } },
            { safe: true, multi: false }
        );

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
}

module.exports = { getAll, getCartById, createCart, addProductToCart, updateProductQuantity, deleteCart, deleteProductFromCart }
