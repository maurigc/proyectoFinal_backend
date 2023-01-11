import ContenedorMongodb from "../../containers/contenedorMongodb.js";
import { userSchema } from "../../models/usuario.models.js";


class UsuariosDAOMongoDb extends ContenedorMongodb{
    constructor(){
        super("usuarios", userSchema);
    }
}


export default UsuariosDAOMongoDb;