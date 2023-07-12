const Product = require('./../dao/models/product')

class ProductService {

    getAll = async (page, limit, sort, query) => {
        try{
            console.log("QUERY services: " + query)
            if(!sort){
                sort = 'asc'
            }
            let products = ''
            if(query){
                products = await Product.paginate({category: query}, { limit:limit || 10, page: page || 1, sort: { price: sort }});
                console.log("Entro al IF")
            }else{
                products = await Product.paginate({}, { limit:limit || 10, page: page || 1, sort: { price: sort }});
                console.log("Entro al ELSE")
            }
            return products;
        }catch(err){
            console.log("err")
        }
    }

    getById = async (id) => {
        try{
            product = await Product.find({_id: id});
            console.log("entro" + product)
            return product
        }catch(err){
            console.log("err")
        }
    }
}

module.exports = ProductService
