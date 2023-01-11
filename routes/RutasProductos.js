import { Router } from "express";
import { productosDao } from "../DAOs/index.js";
import { autenticacion } from "../middlewares/AutenticacionUsuario.js";
import { checkAuthenticated } from "../middlewares/checkAuthenticated.js";
import { logWarn } from "../scripts/log4js.js";


const router = Router();



//***************** Obtener todos los productos ****************//
router.get("/", checkAuthenticated, async(req, res) => {
    try {
        const listadoDeProductos = await productosDao.getAll();
    
        res.render('pages/index', {listadoDeProductos: listadoDeProductos});
        
    } catch (error) {
        logWarn.error(error);
    }

})   

//***************** Obtener un producto por su ID ****************//
router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
    
        const listadoDeProductos = await productosDao.getAll();
    
        const productoEncontrado = listadoDeProductos.find( producto => producto.id === id );
    
        productoEncontrado ? res.status(200).json(productoEncontrado) : res.status(400).json({msjError: `No se encontrò ningun producto con ID:${id}`});
        
    } catch (error) {
        logWarn.error(error);
    }
    
})

//***************** Agregar un producto nuevo ****************//
router.post("/", autenticacion, async(req, res) => {
    try {
        const productoParaGuardar = req.body;
    
        await productosDao.save(productoParaGuardar);

        res.status(200).json({msjExito: `Producto guardado con èxito.`})
    } catch (error) {
        res.status(400).json({msjError: `No se pudo guardar el producto. ${error}`});
    }
    
})

//***************** Actualizar algùn producto ya guardado ****************//
router.put("/:id", autenticacion, async(req, res) => {
    try {
        const { id } = req.params;
        
        await productosDao.update(id, req.body);
    
        res.status(200).json({msjExito: `Producto con ID:${id} se actualizó con éxito.`})
        
    } catch (error) {
        logWarn.error(error);
    }
})

//***************** Eliminar algùn producto ya guardado ****************//
router.delete("/:id", autenticacion, async(req, res) => {
    try {
        const { id } = req.params;
    
        const todosProductos = await productosDao.getAll();
    
        const idEncontrado = todosProductos.some( producto => producto.id === id);
    
        if(idEncontrado){
            await productosDao.deleteById(id);
    
            res.status(200).json({msjExito: `Producto con ID:${id} fue eliminado con éxito.`})
        }else{
            res.status(400).json({msjError: `No existe ningún producto con ID:${id}`})
        }
        
    } catch (error) {
        logWarn.error(error);
    }

})

export { router };