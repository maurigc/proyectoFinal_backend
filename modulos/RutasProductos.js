const express = require("express");
const { Router } = express;
const contenedorProductos = require("../containers/ClaseProducto.js");
const autenticacion = require("../middlewares/AutenticacionUsuario.js");

const router = Router();


//***************** Obtener todos los productos ****************//
router.get("/", async(req, res) => {

    const listadoDeProductos = await contenedorProductos.getAll();

    res.status(200).json(listadoDeProductos);
})   

//***************** Obtener un producto por su ID ****************//
router.get("/:id", async(req, res) => {
    const { id } = req.params;

    const listadoDeProductos = await contenedorProductos.getAll();

    const productoEncontrado = listadoDeProductos.find( producto => producto.id === parseInt(id) );

    productoEncontrado ? res.status(200).json(productoEncontrado) : res.status(400).json({msjError: `No se encontrò ningun producto con ID:${id}`});
    
})

//***************** Agregar un producto nuevo ****************//
router.post("/", autenticacion, async(req, res) => {
    const productoParaGuardar = req.body;
    
    await contenedorProductos.save(productoParaGuardar);

    res.status(200).json({msjExito: `Producto guardado con èxito.`})
})

//***************** Actualizar algùn producto ya guardado ****************//
router.put("/:id", autenticacion, async(req, res) => {
    const { id } = req.params;
    const { name, description, price, code, urlImagen, stock } = req.body;

    await contenedorProductos.update(id, name, description, price, code, urlImagen, stock);

    res.status(200).json({msjExito: `Producto con ID:${id} se actualizó con éxito.`})
})

//***************** Eliminar algùn producto ya guardado ****************//
router.delete("/:id", autenticacion, async(req, res) => {
    const { id } = req.params;

    const todosProductos = await contenedorProductos.getAll();

    const idEncontrado = todosProductos.some( producto => producto.id === parseInt(id));

    if(idEncontrado){
        await contenedorProductos.deleteById(parseInt(id));

        res.status(200).json({msjExito: `Producto con ID:${id} fue eliminado con éxito.`})
    }else{
        res.status(400).json({msjError: `No existe ningún producto con ID:${id}`})
    }

    // 
})

module.exports = router;