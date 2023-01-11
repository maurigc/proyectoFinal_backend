import mongoose from "mongoose";
import { config } from "../config.js";
import { logConsola, logWarn } from "../scripts/log4js.js";




class ContenedorMongodb {
    constructor(coleccion, schema){
        this.connectDbs();
        this.coleccion = mongoose.model(coleccion, schema);
    }

// Funcion para conectar con la base de datos.
    connectDbs = async () => {
        try {
            await mongoose.connect(config.mongoDb.url, config.mongoDb.options) 

            logConsola.info("base de datos conectada");
        } catch (error) {
            logWarn.error(error)
        }

    }

////////////////////////////////////////// METODOS ///////////////////////////////////////////

    //_____________________________________________________________
    //Crear carrito.
    async createCart(){
        try {
            const newCart = new this.coleccion()

            await newCart.save();

            return newCart.id;
        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Obtener todos los items.
    async getAll(){
        try {
            
            return await this.coleccion.find();
            
        } catch (error) {
            logWarn.error(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener items por ID.
    async getById(idItem){
        try {

            return await this.coleccion.find({_id: {$eq: idItem}});
        
        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Guardar un item.
    async save(item){
        try {
            const newItem = new this.coleccion(item)

            await newItem.save()

        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Actualizar algun item ya guardado.
    async update(idItem, nuevaConfig){
        try {
            await this.coleccion.updateOne({_id: {$eq: idItem}}, {$set: nuevaConfig});

            return logConsola.info("actualizado con éxito.");
        } catch (error) {
            logWarn.error(error);
        }
    }
    //_____________________________________________________________
    //Borrar un item por su ID.
    async deleteById(idItem){
        try {
            await this.coleccion.deleteOne({id: {$eq: idItem}});
       
            return logConsola.info("eliminado con éxito.");
        } catch (error) {
            logWarn.error(error);
        }
        
    }
    //_____________________________________________________________
    //Eliminar todos los items.
    async deleteAll(){
        try {
            await this.coleccion.deleteMany({});

            return logConsola.info("Se eliminaron todos con éxito.")
        } catch (error) {
            logWarn.error(error);
        }
        
    }

}


export default ContenedorMongodb;