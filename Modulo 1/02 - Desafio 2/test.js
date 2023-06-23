const ProductManager = require('./ProductManager.js');

const products = new ProductManager('products.json');

const test = async () => {
    let getProducts = await products.getProducts()
    let add = await products.addProduct("Producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)
    let productById = await products.getProductById(1)
    await products.updateProduct({
        id: 1,
        title: "Producto actualizado",
        description: "Producto actualizado",
        price: 100,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 1
    })
    // let deleteProduct = await products.deleteProduct(1)
};

test();
