import ContenedorMongodb from "../../containers/contenedorMongodb.js";
import { cartSchema } from "../../models/carrito.models.js";

class CarritoDAOMongoDb extends ContenedorMongodb{
    constructor(){
        super("carritos", cartSchema)
    }

    //_____________________________________________________________
    //Guardar un producto en un determinado carrito.
    async saveInCart(idCart, producto){
        const cart = await super.getById(idCart);
        
        cart[0].productos = [...cart[0].productos, {...producto[0]}]
        
        await super.update(idCart, cart[0]);
        
        return console.log("producto guardado en carrito.");
    }
    //_____________________________________________________________
    //Eliminar un producto de un determinado carrito.
    async deleteProductInCart(idCart, idProducto){
        const cart = await super.getById(idCart);

        const productosNoEliminados = cart[0].productos.filter( producto => producto.id !== idProducto);
        
        cart[0].productos = [...productosNoEliminados];
        
        await super.update(idCart, cart[0]);
    }
    //_____________________________________________________________
    //Listar productos de un determinado carrito.
    async getProductInCart(idCart){
        const cart = await super.getById(idCart);

        return cart[0].productos;
    }
}



export default CarritoDAOMongoDb;