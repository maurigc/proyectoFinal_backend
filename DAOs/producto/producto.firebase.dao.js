const ContenedorFirebase = require("../../containers/contenedorFirebase.js");


class ProductosDAOFirebase extends ContenedorFirebase{
    constructor(){
        super("productos")
    }
}


const ProductDAOFirebase = new ProductosDAOFirebase();


module.exports = ProductDAOFirebase;