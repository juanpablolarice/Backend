const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')


class Product {    
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
        try {
            const product = await productModel.findOne({ _id: id });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
        // console.log("Product.class")
        // const product = await productModel.findOne({ _id: id }, '_id title description code price status stock category thumbnails')
        // if(product){
        //     console.log('Entro')                
        //     return product
        // }else{
        //     console.log('No entro')            
        // }
        // // console.log("product.class: " + product.name)
        // return "" //product
    }
    
    updateProduct = async (productId, product) => {
        try {
            await productModel.updateOne({_id: productId},  {
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category
            });
            // Falta actualizar el array de imagenes
            return "El producto se actualizó correctamente"
        } catch (e) {            
            return "Ocurrió un error inesperado"
        }
    }

    storeProduct = async (newProduct) => {
        try {
            const code = await productModel.findOne({ code: newProduct.code }, '_id title description code price status stock category thumbnails')
            const title = await productModel.findOne({ title: newProduct.title }, '_id title description code price status stock category thumbnails')
                       
            if(code){
                return "Ya existe un producto con ese código"
            }else if(title){
                return "Ya existe un producto con ese título"
            }else{
                let result = await productModel.create(newProduct)
                return "El producto se creó correctamente"
            }
        } catch (e) {            
            return "Ocurrió un error inesperado"
        }
    }

    getArrProductsData = async (arr) => {
        const productsData = [];

        for (const id of arr) {
            const product = await productModel.findOne({ _id: id })
            productsData.push(product);
        }
      
        return productsData;
    }

    deleteProduct = async (pid) => {        
        try {
            console.log("Product Class")
            const resul = await productModel.deleteOne({_id: pid})
            return resul       
        } catch (error) {
            const response = {
                status: 'error',
                msg: 'El producto no se encontro'
            }
            return JSON.stringify(response)
        }
    }
}

module.exports = Product