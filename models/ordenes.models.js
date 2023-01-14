import { Schema } from "mongoose";

const orderSchema = new Schema({
    buyer: {
        _id: {
            type: String
        },
        username: {
            type: String,
            max: 50,
            required: true,
        },
        password: {
            type: String,
            max: 20,
            required: true
        },
        nombre: {
            type: String,
            max: 50,
            required: true
        },
        direccion: {
            type: String,
            max: 100,
            required: true,
        },
        edad: {
            type: Number,
        },
        telefono: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        idCarrito: {
            type: String
        }
    },
    order: [
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


export { orderSchema };