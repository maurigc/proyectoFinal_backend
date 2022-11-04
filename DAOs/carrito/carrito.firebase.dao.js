const ContenedorFirebase = require("../../containers/contenedorFirebase.js");
const ProductosDAOFirebase = require("../../DAOs/producto/producto.firebase.dao.js");

class CarritoDAOFirebase extends ContenedorFirebase{
    constructor(){
        super("carritos")
    }

    async saveInCart(idCart, idProduct){
        const cart = await super.getById(idCart);

        const product = await ProductosDAOFirebase.getById(idProduct);

        cart.productos = [...cart.productos, {...product}]

        await super.update(idCart, cart);
    }
}


const CartDAOFirebase = new CarritoDAOFirebase();


module.exports = CartDAOFirebase;