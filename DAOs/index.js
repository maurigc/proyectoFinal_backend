
let productosDao
let carritosDao
let usuariosDao

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

        productosDao = new productosDaoMongo();
        carritosDao = new carritoDaoMongo();
        usuariosDao = new UsuariosDAOMongo();

        break
    
}

export { productosDao, carritosDao, usuariosDao };