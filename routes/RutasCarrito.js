import { Router } from "express";
import { carritosDao, productosDao } from "../DAOs/index.js";

const router = Router();



//***************** Crea un carrito nuevo ****************//
router.post("/", async(req, res) => {
    
    await carritosDao.createCart();

    res.status(200).json({msjExito: `Se creó un nuevo carrito.`});
})


//***************** Eliminar un carrito ya existente ****************//
router.delete("/:id", async(req, res) => {
    const { id } = req.params;

    const todosCarritos = await carritosDao.getAll();
    const idEncontrado = todosCarritos.some( producto => producto.id === id);
    
    if(idEncontrado){
        await carritosDao.deleteById(id);

        res.status(200).json({msjExito: `Carrito con ID:${id} eliminado con éxito.`});
    }else{
        res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
    }
    

})


//***************** Lista todos los productos de un carrito ****************//
router.get("/:id/productos", async(req, res) => {
    const { id } = req.params;
    
    const todosCarritos = await carritosDao.getAll();
    const idEncontrado = todosCarritos.some( producto => producto.id === id);

    if(idEncontrado){
        const productosEnCarrito = await carritosDao.getProductInCart(id);
    
        res.status(200).json(productosEnCarrito);
    }else {
        res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
    }
    
    
})


//***************** Agregar productos a un determinado carrito ****************//
router.post("/:id/productos", async(req, res) => {
    const { id : idCarrito } = req.params;
    const { id : idProducto } = req.body;

    const producto = await productosDao.getById(idProducto)
    const todosCarritos = await carritosDao.getAll();
    const idEncontrado = todosCarritos.some( carrito => carrito.id === idCarrito);

    if(idEncontrado){
        await carritosDao.saveInCart(idCarrito, producto);

        res.status(200).json({msjExito: `Producto con ID:${idProducto} se guardó con éxito en el carrito con ID:${idCarrito}.`})
    }else {
        res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
    }
    

})


//***************** Eliminar un producto de un determinado carrito ****************//
router.delete("/:id/productos/:id_producto", async(req, res) => {
    const { id, id_producto } = req.params;

    await carritosDao.deleteProductInCart(id, id_producto);
    
    res.status(200).json({ msjExito: "Productos eliminado con éxito."})
    
    
})

export { router };