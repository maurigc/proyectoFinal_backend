import ContenedorMongodb from "../../containers/contenedorMongodb.js";
import { cartSchema } from "../../models/carrito.models.js";
import { logConsola, logWarn } from "../../scripts/log4js.js";

class CarritoDAOMongoDb extends ContenedorMongodb{
    constructor(){
        super("carritos", cartSchema)
    }

    //_____________________________________________________________
    //Guardar un producto en un determinado carrito.
    async saveInCart(idCart, producto){
        try {
            const cart = await super.getById(idCart);
            
            cart[0].productos = [...cart[0].productos, {...producto[0]}]
            
            await super.update(idCart, cart[0]);
            
            return logConsola.info("producto guardado en carrito.");
            
        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Eliminar un producto de un determinado carrito.
    async deleteProductInCart(idCart, idProducto){
        try {
            const cart = await super.getById(idCart);
    
            const productosNoEliminados = cart[0].productos.filter( producto => producto.id !== idProducto);
            
            cart[0].productos = [...productosNoEliminados];
            
            await super.update(idCart, cart[0]);
            
        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Listar productos de un determinado carrito.
    async getProductInCart(idCart){
        try {
            const cart = await super.getById(idCart);
    
            return cart[0].productos;
            
        } catch (error) {
            logWarn.error(error);
        }
    }
}



export default CarritoDAOMongoDb;