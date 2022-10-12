const express = require("express");
const { Router } = express;
const contenedorCarritos = require("../ClaseCarrito.js");
const contenedorProductos = require("../ClaseProducto.js");

const router = Router();



//***************** Crea un carrito nuevo ****************//
router.post("/", async(req, res) => {
    const idCarrito = await contenedorCarritos.createCart();

    res.status(200).json({msjExito: `Se creó un nuevo carrito con ID:${idCarrito}`});
})


//***************** Eliminar un carrito ya existente ****************//
router.delete("/:id", async(req, res) => {
    const { id } = req.params;

    const todosCarritos = await contenedorCarritos.getAll();

    const idEncontrado = todosCarritos.some( carrito => carrito.id === parseInt(id));

    if(idEncontrado){
        await contenedorCarritos.deleteById(parseInt(id));

        res.status(200).json({msjExito: `Carrito con ID:${id} eliminado con éxito.`})
    }else{
        res.status(400).json({msjError: `No existe ningún carrito con ID:${id}.`});
    }

})


//***************** Lista todos los productos de un carrito ****************//
router.get("/:id/productos", async(req, res) => {
    const { id } = req.params;

    const carritoBuscado = await contenedorCarritos.getById(parseInt(id));
   
    if(carritoBuscado === null){
        res.status(400).json({msjError: `No se encontró ningún carrito con ID:${id}`})
    }else{
        const productosCarrito = carritoBuscado.productos;

        res.status(200).json(productosCarrito);
    }
    
})


//***************** Agregar productos a un determinado carrito ****************//
router.post("/:id/productos", async(req, res) => {
    const { id : idCarrito } = req.params;
    const { id : idProducto } = req.body;

    const carritoBuscado = await contenedorCarritos.getById(parseInt(idCarrito));
    const productoBuscado = await contenedorProductos.getAll();

    if(carritoBuscado === null){
        res.status(400).json({msjError: `No se encuentra ningún carrito con ID:${idCarrito}.`});
        
    }else{
        const idEncontrado = productoBuscado.some( producto => producto.id === parseInt(idProducto));

        if(idEncontrado){
            await contenedorCarritos.save(idCarrito, idProducto);

            res.status(200).json({msjExito: `Producto con ID:${idProducto} se guardó con éxito en el carrito con ID:${idCarrito}.`})
        }else{
            res.status(400).json({msjError: `No se encontro ningùn producto con ID:${idProducto} para agregar.`})
        }     
    }

})


//***************** Eliminar un producto de un determinado carrito ****************//
router.delete("/:id/productos/:id_producto", async(req, res) => {
    const { id, id_producto } = req.params;

    const carritoBuscado = await contenedorCarritos.getById(parseInt(id));
    

    if(carritoBuscado === null){
        res.status(400).json({msjError: `No se encuentra ningún carrito con ID:${id}.`});
        
    }else{
        const idProductoBuscado = carritoBuscado.productos.some( producto => producto.id === parseInt(id_producto));

        if(idProductoBuscado){
            await contenedorCarritos.deleteProductById(id, id_producto);

            res.status(200).json({msjExito: `Producto con ID:${id_producto} se eliminó con éxito del carrito con ID:${id}.`})
        }else{
            res.status(400).json({msjError: `No se encontro ningùn producto con ID:${id_producto} para eliminar.`})
        }     
    }
    
})

module.exports = router;