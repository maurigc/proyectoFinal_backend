import { Schema } from "mongoose";


const productSchema = new Schema({
    nombre: {
        type: String,
        max: 20,
        required: true,
    },
    descripcion: {
        type: String,
        max: 200,
    },
    codigo: {
        type: String,
        max: 100,
        unique: true
    },
    urlImagen: {
        type: String,
        max: 100,
        required: true,
    },
    stock: {
        type: Number,
    },
    precio: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        default: new Date().toLocaleString(),
        max: 20
    }
})


export { productSchema };