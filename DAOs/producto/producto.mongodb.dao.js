import ContenedorMongodb from "../../containers/contenedorMongodb.js";
import { productSchema } from "../../models/producto.models.js";


class ProductosDAOMongoDb extends ContenedorMongodb{
    constructor(){
        super("productos", productSchema);
    }
}


export default ProductosDAOMongoDb;