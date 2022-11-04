const mongoose = require("mongoose");
const config = require("../config.js");
const productSchema = require("../models/producto.models.js");
const cartSchema = require("../models/carrito.models.js");



class ContenedorMongodb {
    constructor(coleccion, schema){
        this.connectDbs();
        this.coleccion = mongoose.model(coleccion, schema);
    }

// Funcion para conectar con la base de datos.
    connectDbs = async () => {
        try {
            await mongoose.connect(config.mongoDb.url, config.mongoDb.options) 

            console.log("base de datos conectada");
        } catch (error) {
            console.log(error)
        }

    }

////////////////////////////////////////// METODOS ///////////////////////////////////////////

    //_____________________________________________________________
    //Crear carrito.
    async createCart(){
        try {
            const newCart = await new this.coleccion()

            await newCart.save();
            console.log("carrito creado");
        } catch (error) {
            console.log(error);
        }
    }
    //_____________________________________________________________
    //Obtener todos los items.
    async getAll(){
        try {
            return await this.coleccion.find();
            
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener items por ID.
    async getById(idItem){
        try {
            return await this.coleccion.find({_id: {$eq: idItem}});
        
        } catch (error) {
            console.log(error);
        }
    }
    //_____________________________________________________________
    //Guardar un item.
    async save(item){
        try {
            const newItem = new this.coleccion(item)

            await newItem.save()
            
        } catch (error) {
            console.log(error);
        }
    }
    //_____________________________________________________________
    //Actualizar algun item ya guardado.
    async update(idItem, nuevaConfig){
        try {
            await this.coleccion.updateOne({_id: {$eq: idItem}}, {$set: nuevaConfig});

            return console.log("actualizado con éxito.");
        } catch (error) {
            console.log(error);
        }
    }
    //_____________________________________________________________
    //Borrar un item por su ID.
    async deleteById(idItem){
        try {
            await this.coleccion.deleteOne({id: {$eq: idItem}});
       
            return console.log("eliminado con éxito.");
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Eliminar todos los items.
    async deleteAll(){
        try {
            await this.coleccion.deleteMany({});

            return console.log("Se eliminaron todos con éxito.")
        } catch (error) {
            console.log(error);
        }
        
    }

}


module.exports = ContenedorMongodb;