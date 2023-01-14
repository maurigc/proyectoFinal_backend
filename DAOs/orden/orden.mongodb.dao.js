import ContenedorMongodb from "../../containers/contenedorMongodb.js";
import { orderSchema } from "../../models/ordenes.models.js";


class OrderDAOmongoDb extends ContenedorMongodb{
    constructor(){
        super("ordenes", orderSchema);
    }
}


export default OrderDAOmongoDb;