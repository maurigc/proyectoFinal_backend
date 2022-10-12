const express = require("express");
const app = express();
const rutasProductos = require("./modulos/RutasProductos.js");
const rutasCarrito = require("./modulos/RutasCarrito.js");

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