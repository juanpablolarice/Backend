const config = require('../config/config')
// const mongoSingleton = require('../config/mongodb-singleton')
const mongoDB = require('./dao/mongo/db')
const dbManager = new mongoDB(config.DB);
const productMongodb = require('./dao/mongo/classes/product.class.js')
const userMongodb = require('./dao/mongo/classes/user.class.js')
const productFilesystem = require('./dao/filesystem/classes/product.class.js')
const userFilesystem = require('./dao/filesystem/classes/user.class.js')


let productClass
let userClass
// async function mongoConnect() {

//     mongoose.connect(this.path,
//         {useUnifiedTopology:true, useNewUrlParser:true},)
//         .then(connect=>{
//             console.log('Conexión a db exitosa.')
//         })
//         .catch(err => console.log(err))
// }

console.log("FACTORY PERSISTENCE: " + config.PERSISTENCE)
switch (config.PERSISTENCE) {
    case 'mongodb':
        dbManager.connect()
        // const { default: Product } = await import('./dao/mongo/classes/product.class.js');
        productClass = new productMongodb();
        console.log("PERSISTENCE: mongodb")
        break;
    case 'filesystem':
        // productClass = new productFilesystem();
        userClass = new userFilesystem()
        console.log("PERSISTENCE: filesystem")
        break;
    default:
        console.log("PERSISTENCE: " + config.PERSISTENCE)
        break;
}

module.exports = { productClass }