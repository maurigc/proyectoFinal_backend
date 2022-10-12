const fs = require("fs");
const contenedorProductos = require("./ClaseProducto.js");

// Clase contenedora
class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    // Funcion que retorna el archivo de texto parseado.
    leerArchivo = async () => {
        const content = await fs.promises.readFile(this.ruta, "utf-8");

        return await JSON.parse(content);
    }

    // Metodo para crear un carrito nuevo.
    async createCart(){
        try {
            const contenidoParseado = await this.leerArchivo();

            const carrito = {
                id: contenidoParseado.length === 0 ? 1 : contenidoParseado.length + 1,
                timestamp: new Date().toLocaleString(),
                productos: []
            }

            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado, {...carrito}], null, 2), "utf-8")
            
            return carrito.id;
        } catch (error) {
            console.log(error);
        }
    }


    // Metodo para guardar un producto en un determinado carrito
    async save(idCarrito, idProducto){
        try {
            const contenidoParseado = await this.leerArchivo();
                
            ////////////////// Buscamos el carrito con el mismo id ///////////////////
            const carritoBuscado = contenidoParseado.find( carrito => carrito.id === parseInt(idCarrito));
            ////////////////// Obtenemos el producto con el mismo id ///////////////////
            const productoBuscado = await contenedorProductos.getById(parseInt(idProducto))

            ////////////////// Agregamos el producto al carrito ///////////////////
            carritoBuscado.productos = [...carritoBuscado.productos, {...productoBuscado}] ;
            ////////////////// Sobrescribimos el carrito con los productos agregados ///////////////////
            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado], null, 2), "utf-8")
            
        
        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para obtener un carrito por su id.
    async getById(idCarrito){
        const contenidoParseado = await this.leerArchivo();

        let carritoBuscado = contenidoParseado.find(carrito => carrito.id === idCarrito); //Buscamos el carrito con el mismo id.

        if(carritoBuscado === undefined){ //si no se encuentra ningun producto pasa a ser nulo.
            carritoBuscado = null;
        }

        return carritoBuscado;
    }


    // Metodo para obtener todos los carritos del archivo.
    async getAll(){
        try {
            const contenidoParseado = await this.leerArchivo();

            return contenidoParseado;

        } catch (error) {
            console.log(error)
        }
        
    }


    // Metodo para eliminar un carrito por su id.
    async deleteById(idCarrito){
        try {
            const contenidoParseado = await this.leerArchivo();

            const contenidoNoEliminado = contenidoParseado.filter( e => e.id !== idCarrito); //filtramos los carritos con el id diferente.

            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoNoEliminado], null, 2), "utf-8");

        } catch (error) {
            console.log(error)
        }
    }


    // Metodo para eliminar un determinado producto en un determinado carrito.
    async deleteProductById(idCarrito, idProducto){
        try {
            const contenidoParseado = await this.leerArchivo();

            ////////////////// Buscamos el carrito con el mismo id ///////////////////
            const carritoBuscado = contenidoParseado.find( carrito => carrito.id === parseInt(idCarrito));
            
            ////////////////// Creamos un nuevo array sin el producto que eliminamos ///////////////////
            const carritoConProductoEliminado = carritoBuscado.productos.filter( producto => producto.id !== parseInt(idProducto));

            ////////////////// Agregamos el nuevo array de productos al carrito ///////////////////
            carritoBuscado.productos = [...carritoConProductoEliminado];

            ////////////////// Sobrescribimos el carrito con los productos nuevos ///////////////////
            await fs.promises.writeFile(this.ruta, JSON.stringify([...contenidoParseado], null, 2), "utf-8");

        } catch (error) {
            console.log(error);
        }


    }
}


const contenedorCarritos = new Contenedor("carritos.txt");


module.exports = contenedorCarritos;