import ContenedorFirebase from "../../containers/contenedorFirebase.js";


class ProductosDAOFirebase extends ContenedorFirebase{
    constructor(){
        super("productos")
    }
}



export default ProductosDAOFirebase;