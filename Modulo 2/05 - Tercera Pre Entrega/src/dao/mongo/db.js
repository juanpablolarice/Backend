const mongoose = require('mongoose')
// const Cart = require('./../dao/models/cart.model')
// const Product = require('./../dao/models/product.model')

class MongoManager {
    constructor(path){
        this.path = path
    }

    connect = () => {
        return mongoose.connect(this.path,
        {useUnifiedTopology:true, useNewUrlParser:true},)
        .then(connect=>{
            console.log('Conexión a db exitosa.')
        })
        .catch(err => console.log(err))
    }
}

module.exports = MongoManager;
