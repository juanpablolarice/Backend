const fs = require("fs")
const path = './products.json'

// Creo el archivo si no existe
if(!fs.existsSync('./products.json')){
    fs.writeFileSync('./products.json', '[]', {encoding:"utf-8"})
}

class ProductManager {
    static id = 0
    constructor(path){
        this.path = path
    }

    getProducts = async () => {
        try{
            let products = await fs.promises.readFile(this.path, "utf-8")//, (err) => err && console.error(err));
            return JSON.parse(products);
        }catch(err){
            console.log(err)
        }
    }

    getProductsLimit = async (limit) => {
        try{
            // let products = await fs.promises.readFile(this.path, "utf-8")//, (err) => err && console.error(err));
            let products = await getProducts()
            return limit;
            let filter = []
            products.forEach(element => filter.push(element))
            return filter;
            // FALTA FILTRAR POR CANTIDAD
            return JSON.parse(filter);
        }catch(err){
            return(err)
            console.log(err)
        }
    }

    getProductById = async (id) => {
        try {
            let products = await this.getProducts()
            let filter = products.find(product => product.id == id )

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

    addProduct = async (title, description, price, thumbnail, code, stock) => {//}, path) => {
        try {
            let products = await this.getProducts()
            let productsUpdated = []
            let product = {
                id: ProductManager.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            // console.log(products.length)
            if(products.length >0){
                let codeExists = products.find(product => product.code === code)
                if(codeExists){
                    return console.log("Ya existe un producto con ese código")
                }
                let maxId = Math.max.apply(Math, products.map(function(prod) { return prod.id; }));
                ProductManager.id = maxId + 1
                product.id = ProductManager.id
                productsUpdated = [products, product]
            }else{
                ProductManager.id++
                product.id = ProductManager.id
                productsUpdated = [product]
            }
            products.push(product)
            let write = await fs.writeFile(this.path, JSON.stringify(products, null, 2), (err) => err && console.error(err))
        } catch (e) {
            return(err)
            console.log(err)
        }
    }

    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts()
            let newProducts = products.filter(prod => {
                return prod.id !== id
            });

            if(products.length == newProducts.length){
                console.log("El ID del producto ingresado no existe")
            }else{
                let write = await fs.writeFileSync(this.path, JSON.stringify(newProducts, null, 2), {encoding:"utf-8"})
            }
        } catch (e) {
            return(err)
            console.log(err)
        }
    }

    updateProduct = async ({id, ...product}) => {
        try {
            console.log("ID Update: " + product.id)
            let deleteProduct = await this.deleteProduct(id);
            let products = await this.getProducts();
            console.log(products.length)
            let productsUpdated = []
            if(products.length>1){
                productsUpdated = [products, {id, ...product}]
            }else{
                productsUpdated = [{id, ...product}]
            }
            products.push({id, ...product})
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), (err) => err && console.error(err))
        } catch (e) {
            return(err)
            console.log(err)
        }
    }
}

module.exports = ProductManager;
