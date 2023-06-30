const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products:{
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                    // type: String,
                    // required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ]
    }
})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart
