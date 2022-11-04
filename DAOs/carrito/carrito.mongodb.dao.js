const ContenedorMongodb = require("../../containers/contenedorMongodb.js");
const cartSchema = require("../../models/carrito.models.js");
const ProductDAOMongoDb = require("../../DAOs/producto/producto.mongodb.dao.js");


class CarritoDAOMongoDb extends ContenedorMongodb{
    constructor(){
        super("carritos", cartSchema)
    }

    async saveInCart(idCart, idProducto){
        const cart = await super.getById(idCart);
        
        const producto = await ProductDAOMongoDb.getById(idProducto);
        
        cart[0].productos = [...cart[0].productos, {...producto[0]}]

        await super.update(idCart, cart[0]);
        
        return console.log("producto guardado en carrito.");
    }
}


const cartDAOMongodb = new CarritoDAOMongoDb();

module.exports = cartDAOMongodb;