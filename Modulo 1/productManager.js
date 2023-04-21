const { deepStrictEqual } = require("assert")
const fs = require("fs")
const path = './products.json'

// Creo el archivo si no existe
// if(!fs.existsSync('./products.json')){
//     fs.writeFileSync('./products.json', '[]', {encoding:"utf-8"})
// }

class ProductManager {
    count = 0;
    constructor(title, description, price, thumbnail, code, stock, path){
        this.id = ++this.count;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.path = path;
    }

    getProducts = () => {
        fs.promises.readFile("./products.json", "utf-8")
        .then((data)=> {
            try{
                let arrayProducts = JSON.parse(data);
                console.log(arrayProducts);
            }catch{
                console.log("El contenido del archivo esta corrupto")
            }
        }).catch((err)=> {
            throw "No se pudo abrir el archivo"
        })
    }

    addProduct =  (title, description, price, thumbnail, code, stock, path) => {
        fs.promises.readFile("./products.json", "utf-8")
        .then((data)=> {
            try{
                let arrayProducts = JSON.parse(data);
                let arrayProductsId = arrayProducts.map(prod => prod.id);
                let maxId = arrayProductsId.reduce(function(prev, current) {
                    return (prev.id > current.id) ? prev : current
                })
                maxId = maxId + 1
                let product = {
                    id: maxId,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    path: path
                }
                arrayProducts.push(product)
                fs.promises.writeFile("./products.json", arrayProducts, { encoding: "utf8" })
                .then((data)=> {
                    console.log("Se guardo")
                }).catch((err)=> {
                    console.log("Error1")
                })
                console.log(arrayProducts);
            }catch{
                console.log("Error2")
            }
        }).catch((err)=> {
            console.log("Error3")
        })
    }

    getProductById = (id) => {
        fs.promises.readFile("./products.json", "utf-8")
        .then((data)=> {
            try{
                let arrayProducts = JSON.parse(data);
                let product = arrayProducts.find(prod => prod.id == id);
                if(product){
                    console.log(product);
                }else{
                    console.log("El ID ingresado no existe")
                }
            }catch{
                console.log("Error")
            }
        }).catch((err)=> {
            throw "No se pudo abrir el archivo"
        })
    }

    deleteProduct = (id) => {
        fs.promises.readFile("./products.json", "utf-8")
        .then((data)=> {
            try{
                let arrayProducts = JSON.parse(data);
                let newProducts = arrayProducts.filter(prod => {
                    return prod.id !== id
                });
                return fs.promises.writeFile("./products.json", newProducts, { encoding: "utf8" })
                // if(product){
                //     console.log(product);
                // }else{
                //     console.log("El ID ingresado no existe")
                // }
            }catch{
                console.log("Error")
            }
        }).catch((err)=> {
            throw "No se pudo abrir el archivo"
        })
    }
}
//
//
let instancia = new ProductManager();
instancia.getProducts()
// instancia.deleteProduct(1)
instancia.addProduct({ title: "title", description: "description", price: 66611188, thumbnail: "thumbnail", code: "code", stock: 12, path: "./products.json" });
