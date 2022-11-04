const admin = require("firebase-admin");
const config = require("../config.js");

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.options)
})

class ContenedorFirebase{
    constructor(coleccion){
        this.query = admin.firestore().collection(coleccion);
    }


////////////////////////////////////////// METODOS ///////////////////////////////////////////
    //_____________________________________________________________
    //Crear carrito.
    async createCart(){
        const cart = await this.query.doc();

        await cart.create({
            timestamps: new Date().toLocaleString(),
            productos: []
        })
    }

    //_____________________________________________________________
    //Obtener todos los items.
    async getAll(){
        try {
            const querydocumentos = await this.query.get();
        
            const docs = querydocumentos.docs
        
            const respuesta = docs.map( doc => ({ id: doc.id, ...doc.data() }));

            return respuesta;
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Obtener items por ID.
    async getById(idItem){
        try {
            const documento = await this.query.doc(idItem).get();

            return {id: documento.id, ...documento.data()} 
        } catch (error) {
            console.log(error);
        }
         
    }
    //_____________________________________________________________
    //Guardar un item.
    async save(item){
        try {
            const documento = await this.query.doc();

            await documento.create(item);
        } catch (error) {
            console.log(error);
        }
        
    }
    //_____________________________________________________________
    //Actualizar algun item ya guardado.
    async update(idItem, nuevaConfig){
        try {
            const documento = await this.query.doc(idItem);

            await documento.update(nuevaConfig);
        } catch (error) {
            console.log(error);
        }
        

    }
    //_____________________________________________________________
    //Borrar un item por su ID.
    async deleteById(idItem){
        try {
            const documento = await this.query.doc(idItem);

            await documento.delete();
        } catch (error) {
            console.log(error);
        }
        
    }   
    
}


module.exports = ContenedorFirebase;


