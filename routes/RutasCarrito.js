import { Router } from "express";
import { carritosDao, productosDao, ordenesDao } from "../DAOs/index.js";
import { transport } from "../scripts/nodemailer.js";
import { cliente } from '../scripts/twilio.js';
import { logWarn } from "../scripts/log4js.js";
import { crearHtmlMail, crearBodyWhatsapp } from "../scripts/mail.js";
import { checkAuthenticated } from "../middlewares/checkAuthenticated.js";

const router = Router();


// ***************** Guarda los productos en el carrito ****************//
router.post("/productos", async(req, res) => {
    try {
        const { idCarrito } = req.session.user;
        const { id } = req.body
        
        // Buscamos productos por id
        const productoEncontrado = await productosDao.getById(id);
        
        // Guardamos el producto en el carrito
        await carritosDao.saveInCart(idCarrito, productoEncontrado);
        
        // Obtenemos todos los productos del carrito
        const productosEnCarrito = await carritosDao.getById(idCarrito);
        
        // Guarda los productos del carrito en la session
        req.session.productos = productosEnCarrito[0].productos

    } catch (error) {
        logWarn.error(error);
    }

})

// ***************** Finaliza la compra ****************//
router.post("/finalizarCompra", async(req, res) => {
    try {
        const cart = await carritosDao.getById(req.session.user.idCarrito)
        // Se crea la orden con el comprador y los items
        const generarOrden = {
            buyer: req.session.user,
            order: cart[0].productos
        }
        //Guarda la orden en la db
        await ordenesDao.save(generarOrden);
        // Elimina los items del carrito ya comprado.
        await carritosDao.deleteProductsInCart(req.session.user.idCarrito);

        // Opciones para el envio de mail.
        const mailOptions = {
            from: 'Ecommerce-c32125',
            to: req.session.user.username,
            subject: `Nuevo pedido de ${req.session.user.nombre}`,
            html: crearHtmlMail(cart[0].productos)
        }
    
        // Opciones para el envio de whatsapp.
        const opcionesWhatsapp = {
            body: crearBodyWhatsapp(cart[0].productos),
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+${req.session.user.telefono}`
        }
    
        // Opciones para el envio de mensaje de texto.
        const opcionesTexto = {
            body: 'Su pedido ha sido recibido con éxito, está siendo preparado.',
            from: '+13022148842',
            to: `+${req.session.user.telefono}`,
        }
    
        // Envia mail y mensaje de exito en la compra
        await transport.sendMail(mailOptions);
    
        await cliente.messages.create(opcionesWhatsapp);
    
        await cliente.messages.create(opcionesTexto);
        
    } catch (error) {
        logWarn.error(error);
    }

})


// ***************** Renderiza el carrito ****************//
router.get("/session", checkAuthenticated, async(req, res) => {
    try {
        const productos = await carritosDao.getProductInCart(req.session.user.idCarrito);
        
        res.render("pages/cartIndex", {productos: productos})
        
    } catch (error) {
        logWarn.error(error);
    }
})



//***************** Crea un carrito nuevo ****************//
router.post("/", async(req, res) => {
    try {
        const idCarrito = await carritosDao.createCart();
    
        req.session.carrito = idCarrito;
    
        res.status(200).json({msjExito: `Se creó un nuevo carrito.`});
        
    } catch (error) {
        logWarn.error(error);
    }
})



//***************** Eliminar un carrito ya existente ****************//
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
    
        const todosCarritos = await carritosDao.getAll();
        const idEncontrado = todosCarritos.some( producto => producto.id === id);
        
        if(idEncontrado){
            await carritosDao.deleteById(id);
    
            res.status(200).json({msjExito: `Carrito con ID:${id} eliminado con éxito.`});
        }else{
            res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
        }
        
    } catch (error) {
        logWarn.error(error);
    }
    

})


//***************** Lista todos los productos de un carrito ****************//
router.get("/:id/productos", async(req, res) => {
    try {
        const { id } = req.params;
        
        const todosCarritos = await carritosDao.getAll();
        const idEncontrado = todosCarritos.some( producto => producto.id === id);
    
        if(idEncontrado){
            const productosEnCarrito = await carritosDao.getProductInCart(id);
            
            res.status(200).json(productosEnCarrito);
        }else {
            res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
        }
        
    } catch (error) {
        logWarn.error(error);
    }
    
    
})


//***************** Agregar productos a un determinado carrito ****************//
router.post("/:id/productos", async(req, res) => {
    try {
        const { id : idCarrito } = req.params;
        const { id : idProducto } = req.body;
    
        const producto = await productosDao.getById(idProducto)
        const todosCarritos = await carritosDao.getAll();
        const idEncontrado = todosCarritos.some( carrito => carrito.id === idCarrito);
        

        if(idEncontrado){
            await carritosDao.saveInCart(idCarrito, producto);
    
            // res.render('pages/cartIndex', {productos: req.session.producto});
            res.status(200).json({msjExito: `Producto con ID:${idProducto} se guardó con éxito en el carrito con ID:${idCarrito}.`})
        }else {
            res.status(400).json({msjError: `No existe ningún carrito con ID:${id}`});
        }
        
    } catch (error) {
        logWarn.error(error);
    }
    

})


//***************** Eliminar un producto de un determinado carrito ****************//
router.delete("/:id/productos/:id_producto", async(req, res) => {
    try {
        const { id, id_producto } = req.params;
    
        await carritosDao.deleteProductInCart(id, id_producto);
        
        res.status(200).json({ msjExito: "Productos eliminado con éxito."})
        
    } catch (error) {
        logWarn.error(error);
    }
    
    
})

export { router };