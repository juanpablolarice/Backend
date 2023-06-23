class Product {
    constructor(id, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor(product){
        this.products=[];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const result = this.products.filter(product => product.code == code);
        if(result.length > 0){
            return ('El código de producto ya existe');
        }else{
            let product = new Product(Math.max(...this.products.map(product => product.id), 0) + 1, title, description, price, thumbnail, code, stock)
            this.products.push(product);
            return ('El producto se agrego correctamente');
        }
    }

    getProductById = (id) => {
        const result = this.products.filter(product => product.id == id);
        if(result.length > 0){
            return product;
        }else{
            return (`No existe el producto con ID: ${id}`);
        }
    }
}


let instancia = new ProductManager();
console.log(instancia.getProducts());
console.log(instancia.addProduct("producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25));
console.log(instancia.getProducts());
console.log(instancia.addProduct("producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25));
console.log(instancia.getProductById(10));
