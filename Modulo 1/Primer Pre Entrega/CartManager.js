const fs = require("fs")
const path = './carts.json'

// Creo el archivo si no existe
if(!fs.existsSync('./carts.json')){
    fs.writeFileSync('./carts.json', '[]', {encoding:"utf-8"})
}

class CartManager {
    static id = 0
    constructor(){
        // this.carts = []
    }

    getCarts = async () => {
        try{
            let carts = await fs.promises.readFile(this.path, "utf-8")//, (err) => err && console.error(err));
            return JSON.parse(carts);
        }catch(err){
            console.log(err)
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
            let carts = await this.getcarts()
            let filter = carts.find(cart => cart.id == id )

            if(filter){
                return filter
            }else{
                return "El ID ingresado no existe"
            }
        } catch (e) {
            return(err)
            console.log(err)
        }
    }

    createCart = async () => {
        let carts = await this.getCarts()
        let cartsUpdated = []
        let cart = {
            id: CartManager.id,
            carts: []
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
        return carts
    }
    //
    // addCarts = async (title, description, code, price, status, stock, thumbnails) => {//}, path) => {
    //     try {
    //         let carts = await this.getcarts()
    //         let cartsUpdated = []
    //         let cart = {
    //             id: CartManager.id,
    //             products: []
    //         }
    //
    //         if(carts.length >0){
    //             let codeExists = carts.find(cart => cart.code === code)
    //             if(codeExists){
    //                 return console.log("Ya existe un carro con ese código")
    //             }
    //             let maxId = Math.max.apply(Math, carts.map(function(prod) { return prod.id; }));
    //             CartManager.id = maxId + 1
    //             cart.id = CartManager.id
    //             cartsUpdated = [carts, cart]
    //         }else{
    //             CartManager.id++
    //             cart.id = CartManager.id
    //             cartsUpdated = [cart]
    //         }
    //         carts.push(cart)
    //         let write = await fs.writeFile(this.path, JSON.stringify(carts, null, 2), (err) => err && console.error(err))
    //     } catch (e) {
    //         return(err)
    //         console.log(err)
    //     }
    // }
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
