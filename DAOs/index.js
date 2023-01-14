
let productosDao
let carritosDao
let usuariosDao
let ordenesDao

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
        const {default : UsuariosDAOMongo} = await import("./usuario/usuario.mongodb.js");
        const {default : OrderDAOmongoDb} = await import("./orden/orden.mongodb.dao.js");

        productosDao = new productosDaoMongo();
        carritosDao = new carritoDaoMongo();
        usuariosDao = new UsuariosDAOMongo();
        ordenesDao = new OrderDAOmongoDb();

        break
    
}

export { productosDao, carritosDao, usuariosDao, ordenesDao };