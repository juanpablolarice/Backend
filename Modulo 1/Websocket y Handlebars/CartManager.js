const fs = require("fs")
const path = './carts.json'
const ProductManager = require('./ProductManager');

// Creo el archivo si no existe
if(!fs.existsSync('./carts.json')){
    fs.writeFileSync('./carts.json', '[]', {encoding:"utf-8"})
}

class CartManager {
    static id = 0
    constructor(){
        this.path = path
    }

    getCarts = async () => {
        try{
            let carts = await fs.promises.readFile(this.path, "utf-8")//, (err) => err && console.error(err));
            return JSON.parse(carts);
        }catch(err){
            console.log(err)
        }
    }

    productValidate = async (productId) => {
        const newProduct = await new ProductManager('./products.json')
        const products = await newProduct.getProducts()

        // const exist = products.filr
        let productExists = await products.find(product => product.id === productId)
        console.log(productExists)
        if(productExists){
            return true
        }else{
            return false
        }
    }
    //
    // getCartsLimit = async (limit) => {
    //     try{
    //         let carts = await getcarts()
    //         return limit;
    //         let filter = []
    //         carts.forEach(element => filter.push(element))
    //         return filter;
    //
    //         return JSON.parse(filter);
    //     }catch(err){
    //         return(err)
    //         console.log(err)
    //     }
    // }
    //
    getCartById = async (id) => {
        try {
            let carts = await this.getCarts()
            let cart = carts.find(cart => cart.id == id )

            if(cart){
                return cart.products
            }else{
                return "El ID ingresado no corresponde a ningún carro"
            }
        } catch (e) {
            return(e)
        }
    }

    createCart = async () => {
        try {
            let carts = await this.getCarts()
            let cartsUpdated = []
            let cart = {
                id: CartManager.id,
                products: []
            }

            if(carts.length >0){
                let maxId = Math.max.apply(Math, carts.map(function(cart) { return cart.id; }));
                CartManager.id = maxId + 1
                cart.id = CartManager.id
                cartsUpdated = [carts, cart]
            }else{
                CartManager.id++
                cart.id = CartManager.id
                cartsUpdated = [cart]
            }
            carts.push(cart)
            let write = await fs.writeFile(this.path, JSON.stringify(carts, null, 2), (err) => err && console.error(err))
            return "El carrito se creó correctamente"
        } catch (e) {
            return "No se pudo crear el carrito"
        }
    }

    saveProductByCart = async (cartId, productId) => {
        // Traigo los productos para validar que exista fuera del carro
        const newProduct = new ProductManager('./products.json')
        const products = await newProduct.getProducts()
        // Traigo todos los carros
        const carts = await this.getCarts()
        // Traigo el carro a modificar
        const cart = await this.getCartById(cartId)
        // Valido que exista el carro
        const indexCart = carts.findIndex(cart => cart.id == cartId )


        if(indexCart == -1){
            return "El carro ingresado no existe"
        }

        // return cart
        // const exist = products.filr

        // Valido que el producto existe en general
        let indexProduct = products.findIndex(product => product.id == productId)
        if(indexProduct == -1){
            return "El producto no existe"
        }else{
            // Valido si el producto existe en el carro
            const indexProductCart = cart.findIndex(product => product.id == productId)
            console.log(indexCart)
            if(indexProductCart == -1){
                const productToCart = {
                    id: parseInt(productId),
                    quantity: 1
                }
                cart.push(productToCart)
                // return false
            }else{
                const productToCart = {
                    id: parseInt(productId),
                    quantity: cart[indexProductCart].quantity + 1
                }
                cart[indexProductCart] = { ...cart[indexProductCart], ...productToCart }
            }

            let cartNew = {
                id: parseInt(cartId),
                products: cart
            }

            carts[indexCart] = { ...carts[indexCart], ...cartNew }

            let write = await fs.writeFile(this.path, JSON.stringify(carts, null, 2), (err) => err && console.error(err))
            return "El producto se agregó correctamente"
        }
    }
    //
    // deleteCarts = async (id) => {
    //     try {
    //         let carts = await this.getcarts()
    //         const index = carts.findIndex(prod => prod.id == id)
    //
    //         if(index == -1){
    //             return "El ID del carro ingresado no existe"
    //         }else{
    //             carts.splice(index, 1)
    //             let write = await fs.writeFileSync(this.path, JSON.stringify(carts, null, 2), {encoding:"utf-8"})
    //             return "El carro se eliminó correctamente"
    //         }
    //     } catch (err) {
    //         return(err)
    //         console.log(err)
    //     }
    // }
    //
    // updateCarts = async (id, cart) => {
    //     let carts = await this.getcarts()
    //     const index = carts.findIndex(prod => prod.id == id)
    //
    //     if(index != -1){
    //         let codeExists = false
    //         carts.forEach((prod) => {
    //             if(prod.code === cart.code && prod.id != id){
    //                 codeExists = true
    //             }
    //         })
    //         if(codeExists){
    //             return "Ya existe un carro con ese código"
    //         }
    //         carts[index] = { ...carts[index], ...cart }
    //         await fs.writeFile(this.path, JSON.stringify(carts, null, 2), (err) => err && console.error(err))
    //         return "El carro se actualizó correctamente"
    //     }else{
    //         throw new Error("El ID del carro ingresado no existe")
    //     }
    // }
}

module.exports = CartManager;
