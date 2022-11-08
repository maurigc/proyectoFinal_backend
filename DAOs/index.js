let productosDao
let carritosDao

switch ("mongodb") {
    case 'firebase':
        const { default : productosDaoFirebase} = await import("./producto/producto.firebase.dao.js");    
        const { default : carritoDaoFirebase } = await import("./carrito/carrito.firebase.dao.js");

        productosDao = new productosDaoFirebase();
        carritosDao = new carritoDaoFirebase();

        break
    case 'mongodb':
        const {default : productosDaoMongo} = await import("./producto/producto.mongodb.dao.js");    
        const {default : carritoDaoMongo} = await import("./carrito/carrito.mongodb.dao.js");

        productosDao = new productosDaoMongo();
        carritosDao = new carritoDaoMongo();

        break
    
}

export { productosDao, carritosDao };