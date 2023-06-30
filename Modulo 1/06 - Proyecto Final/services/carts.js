const Cart = require('./../dao/models/cart')

const getAll = async (req, res) => {
    console.log("Entro al service cart")
    try {
        //         // carts = await Cart.find({}).populate('products.product');
        const carts = await Cart.find().populate('products.product')
        res.status(200).send(carts)
    } catch (error) {
        res.status(404).send(error)
    }
}
// class CartService {

    // const getAll = async () => {
    //     try{
    //         console.log("Entro al SERVICE")
    //         // carts = await Cart.find({}).populate('products.product');
    //         // return carts;
    //     }catch(err){
    //         console.log("err")
    //     }
    // }
// }
//
// module.exports = CartService
module.exports = { getAll }
