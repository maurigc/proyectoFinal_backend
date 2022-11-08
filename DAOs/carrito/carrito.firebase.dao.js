import ContenedorFirebase from "../../containers/contenedorFirebase.js";

class CarritoDAOFirebase extends ContenedorFirebase{
    constructor(){
        super("carritos")
    }

    //_____________________________________________________________
    //Guardar un producto en un determinado carrito.
    async saveInCart(idCart, producto){
        const cart = await super.getById(idCart);

        cart.productos = [...cart.productos, {...producto}]

        await super.update(idCart, cart);
    }
    //_____________________________________________________________
    //Eliminar un producto de un determinado carrito.
    async deleteProductInCart(idCart, idProducto){
        const cart = await super.getById(idCart);

        const productosNoEliminados = cart.productos.filter( producto => producto.id !== idProducto);

        cart.productos = [...productosNoEliminados];
        
        await super.update(idCart, cart);
    }
    //_____________________________________________________________
    //Listar productos de un determinado carrito.
    async getProductInCart(idCart){
        const cart = await super.getById(idCart);

        return cart.productos;
    }
}



export default CarritoDAOFirebase;