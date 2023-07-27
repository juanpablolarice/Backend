const mongoose = require('mongoose')
const Cart = require('./../dao/models/cart')
const Product = require('./../dao/models/product')

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
