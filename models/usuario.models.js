import { Schema } from "mongoose";


const userSchema = new Schema({
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
    }
})


export { userSchema };