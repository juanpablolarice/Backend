const productModel = require('../models/product.model')

class Product {    
    constructor(){
        this.data = []
    }

    prueba = async (p) => {
        console.log("entro a prueba")
        return { msg: "prueba", a: p }
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
            } else if (category) {
                dataProducts = await productModel.paginate({ category: category }, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
            } else if (status) {
                dataProducts = await productModel.paginate({ status: status || true }, {
                    limit:limit || 10,
                    sort: { price: sort || 'asc' },
                    page: page || 1
                })
            } else {
                dataProducts = await productModel.paginate({}, {
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
            
            return [products, rest]
        } catch (err) {
            console.log("ERROR")
            return { error: 'Se produjo un error inesperado' }
        }
    }
    
    getProductById = async (id) => {
        console.log("Product.class")
        const product = await productModel.findOne({ _id: id }, '_id title description code price status stock category thumbnails')
        if(product){
            console.log('Entro')                
            return product
        }else{
            console.log('No entro')            
        }
        // console.log("product.class: " + product.name)
        return "" //product
    }

    createProduct = async () => {

    }

    storeProduct = async (newProduct) => {
        try {
            const code = await productModel.findOne({ code: newProduct.code }, '_id title description code price status stock category thumbnails')
            const title = await productModel.findOne({ title: newProduct.title }, '_id title description code price status stock category thumbnails')
            
            // let productsUpdated = []            
            // const thumbs = thumbnails.split(",")
            
            // let newProduct = {
            //     title: title,
            //     description: description,
            //     code: code,
            //     price: price,
            //     status: status,
            //     stock: stock,
            //     category: category,
            //     thumbnails: thumbs
            // }
           
            if(code){
                console.log("Entro")
                return "Ya existe un producto con ese código"
            }else if(title){
                return "Ya existe un producto con ese título"
            }else{
                console.log("No entro")
                let result = await productModel.create(newProduct)
                return "Se crea correctamente"
            }
        } catch (e) {
            console.log(e)
            return "Ocurrió un error inesperado"
            return(e)
        }
    }
}

module.exports = Product