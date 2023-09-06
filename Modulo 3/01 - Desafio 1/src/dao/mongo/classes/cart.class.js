const { deleteProductFromCart } = require('../../../controllers/cartController')
const cartModel = require('../models/cart.model')
const productModel = require('../models/product.model')

class Cart {    
    constructor(){
        this.data = []
    }

    allProducts = async (category, status, limit, sort, page) => {
        let dataProducts = ''
        try {
            if (category && status) {
                dataProducts = await productModel.paginate({ $or: [{ category: category }, { status: status || true }] }, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
                console.log("Entro al 1")
            } else if (category) {
                dataProducts = await productModel.paginate({ category: category }, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
                console.log("Entro al 2")
            } else if (status) {
                dataProducts = await productModel.paginate({ status: status || true }, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
                console.log("Entro al 3")
            } else {
                dataProducts = await productModel.paginate({}, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
                console.log("Entro al default")
            }
            console.log("No entro")
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
            
            return [products, rest]
        } catch (err) {
            console.log("ERROR")
            return { error: 'Se produjo un error inesperado' }
        }
    }
    getAll = async (req, res) => {
        try{            
            const carts = await cartModel.find().populate('products.product')
            return (carts)
        }catch (error) {
            res.status(500).json({
                status: 'Error',
                msg: 'No se pudieron obtener los carros',
            })
        }
    }
    
    getCartById = async (id) => {
        // const cart = await cartModel.findOne({ _id: id }, '_id ')
        const cart = await cartModel.findOne({ _id: id }).populate('products.product')
        // console.log("Cart.class: " + cart)
        // console.log("cart.products: " + cart.products)
        const products = cart.products
        if(cart){
            return [cart, products]
        }else{
            console.log('No entro')            
        }
        // console.log("product.class: " + product.name)
        return "" //product
    }

    getTotal = async (id) => {     

        const cart = await cartModel.findOne({ _id: id }).populate('products.product')
        const products = cart.products
        const total = 0
        let  productsHandlebars = products.map((item) => {
            const subtotal = item.quantity * item.product.price            
            total = total + subtotal
            console.log("total " + total)        
        })
        
        return total
    }

    createCart = async () => {

    }

    updateCart = async (cartId, productId, quantity, operation) => { // OPERATION sumar, restar    
        try {
            console.log("Entro")
            const product = await productModel.findById(productId)
            const cart = await cartModel.findById(cartId)
            const stock = product.stock
            let total = 0
            console.log("Stock: " + stock)
            const productInCartIndex = cart.products.findIndex(entry => entry.product.toString() === productId)
            console.log("productInCartIndex: " + productInCartIndex)

            switch (operation) {
                case 'add': 
                    if (productInCartIndex != -1) {
                        console.log("Se encontro el producto")
                        if (product) {
                            console.log("El producto a actualizar es: ")
                            const existingQuantity = cart.products.find(entry => entry.product.toString() === productId)?.quantity || 0
                            console.log("existingQuantity: " + existingQuantity)
                            const totalQuantity = existingQuantity + quantity
                            console.log("totalQuantity: " + totalQuantity)
                            if (quantity <= stock) {
                                const subtotalPrice = product.price + totalQuantity
                                cart.products[productInCartIndex].quantity = totalQuantity
                                product.stock -= quantity
                                await product.save()
                                await cart.save()
                                const cartUpdated = await cartModel.findById(cartId).populate('products.product')
                                cartUpdated.products.map((item) => {      
                                    console.log('Item. ' + (parseFloat(item.product.price) * parseInt(item.quantity)))
                                    total = total + (item.product.price * item.quantity)
                                })

                                const response = {
                                    status: 'success',
                                    msg: 'El producto se agrego correctamente',
                                    quantity: totalQuantity,
                                    subtotal: subtotalPrice,
                                    total: total
                                }                                
                                return JSON.stringify(response)                                
                            } else {
                                const response = {
                                    status: 'error',
                                    msg: 'No hay stock disponible'
                                }
                                return JSON.stringify(response)
                            }
                        } else {
                            const response = {
                                status: 'error',
                                msg: 'El producto no se encontró'
                            }
                            return JSON.stringify(response)
                        }
                    } else {
                        const existingQuantity = cart.products.find(entry => entry.product.toString() === productId)?.quantity || 0
                        console.log("Se encontro el producto")
                        if (product) {
                            if (quantity <= stock) {
                                cart.products.push({ product: product._id, quantity: 1 })
                                product.stock -= quantity
                                await product.save()
                                await cart.save()
                                const cartUpdated = await cartModel.findById(cartId).populate('products.product')
                                const response = {
                                    status: 'success',
                                    msg: 'El producto se agrego correctamente'
                                }
                                return JSON.stringify(response)
                            } else {
                                const response = {
                                    status: 'error',
                                    msg: 'No hay stock disponible'
                                }
                                return JSON.stringify(response)
                            }
                        } else {
                            const response = {
                                status: 'error',
                                msg: 'El producto no se encontro'
                            }
                            return JSON.stringify(response)
                        }
                    }  
                    break;
                case 'remove':
                    if (productInCartIndex != -1) {
                        const existingQuantity = cart.products.find(entry => entry.product.toString() === productId)?.quantity || 0
                        if(existingQuantity>1){ // RESTO A LA CANTIDAD DE PRODUCTOS
                            const totalQuantity = existingQuantity - quantity
                            cart.products[productInCartIndex].quantity = totalQuantity
                            product.stock += quantity
                            await product.save()
                            await cart.save()
                        }else{ //ELIMINO DIRECTAMENTE EL PRODUCTO
                            cart.products.splice(productInCartIndex, 1)
                            product.stock += quantity
                            await product.save()
                            await cart.save()
                            const cartUpdated = await cartModel.findById(cartId).populate('products.product')
                        }
                        const response = {
                            status: 'success',
                            msg: 'El producto se elimino correctamente del carro'
                        }
                        return JSON.stringify(response)
                    }else{
                        const response = {
                            status: 'error',
                            msg: 'El producto no se encontro'
                        }
                        return JSON.stringify(response)
                    }
                    break;
                default:
                    const response = {
                        status: 'error',
                        msg: 'Ocurrio un error inesperado'
                    }
                    return JSON.stringify(response)
            }            
        } catch (e) {
            const response = {
                status: 'error',
                msg: 'Ocurrio un error inesperado'
            }
            return JSON.stringify(response)
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        try {
            const product = await productModel.findById(productId)
            console.log(product)
            const cart = await cartModel.findOne({ _id: cartId })
            const productInCartIndex = cart.products.findIndex(entry => entry.product.toString() === productId)
            if (productInCartIndex != -1) {                
                const existingQuantity = cart.products[productInCartIndex].quantity
                console.log("existingQuantity: " + existingQuantity)
                const productStock = product.stock
                console.log("productStock: " + productStock)
                cart.products.splice(productInCartIndex, 1)
                await cart.save()        
                product.stock = existingQuantity + productStock
                await product.save()

                const response = {
                    status: 'success',
                    msg: 'El producto se eliminó correctamente del carro'
                }                
                return JSON.stringify(response)                
            }else{
                const response = {
                    status: 'success',
                    msg: 'No se encontro el producto'
                }                
                return JSON.stringify(response)                
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                msg: 'Error',
            })
        }
    }
}

module.exports = Cart