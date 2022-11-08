import express from "express";
import { router as rutasProductos } from "./routes/RutasProductos.js";
import { router as rutasCarrito } from "./routes/RutasCarrito.js";

const app = express();

///////////////////// Midleware //////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////// Puerto //////////////////////
const PORT = 8080;
app.listen(PORT, (err) => {
    err ? console.log(`Imposible conectar al servidor`) : console.log(`Servidor conectado al puerto ${PORT} correctamente.`);
})

///////////////////// Ruta raiz para Productos //////////////////////
app.use("/productos", rutasProductos);

///////////////////// Ruta raiz para Carrito //////////////////////
app.use("/carrito", rutasCarrito)