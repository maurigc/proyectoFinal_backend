const ContenedorMongoDb = require("../../containers/contenedorMongodb.js");
const productSchema = require("../../models/producto.models.js");

class ProductosDAOMongoDb extends ContenedorMongoDb{
    constructor(){
        super("productos", productSchema);
    }
}


const ProductDAOMongoDb = new ProductosDAOMongoDb();

module.exports = ProductDAOMongoDb;