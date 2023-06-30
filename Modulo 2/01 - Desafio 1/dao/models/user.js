const mongoose = require('mongoose')
// const paginate = require('mongoose-paginate-v2')
const usersCollection = 'users'

const UserSchema = new mongoose.Schema({
    // _id:{
    //     type:String,
    // },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'User',
        enum:['Admin', 'User']
    }
    // code:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },
    // price:{
    //     type:Number,
    //     required:true
    // },
    // status:{
    //     type:Boolean,
    //     required:true,
    // },
    // stock:{
    //     type:Number,
    //     required:true
    // },
    // category:{
    //     type:String,
    //     required:true,
    //     enum:['Televisores', 'Celulares', 'Notebooks']
    // },
    // thumbnails:[{
    //     type:String
    // }]
})

// ProductSchema.plugin(paginate)
// const Product = mongoose.model('product', ProductSchema)
const User = mongoose.model(usersCollection, UserSchema)

module.exports = User
