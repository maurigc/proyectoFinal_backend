const { Schema } = require("mongoose");


const cartSchema = new Schema({
    timestamp: {
        type: String,
        default: new Date().toLocaleString(),
        max: 30
    },
    productos: [
        {
            nombre: {
                type: String,
                unique: false,
            },
            descripcion: {
                type: String,
            },
            codigo: {
                type: String,
            },
            urlImagen: {
                type: String,
            },
            stock: {
                type: Number,
            },
            precio: {
                type: Number,
            },
            timestamp: {
                type: String,
        }}
    ] 
        
    
})


module.exports = cartSchema;