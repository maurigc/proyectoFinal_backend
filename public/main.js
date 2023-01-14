const botones = document.querySelectorAll(".elcontenedor button");

const productos = [];

botones.forEach( boton => {
    boton.addEventListener("click", async(e) => {
        const id = e.target.closest(".elcontenedor").getAttribute("id");

        const producto = {
            id: id
        }

        

        await fetch(`http://localhost:8000/carrito/productos`,{
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    })
})



const botonFinalizarCompra = document.getElementById("finalizarCompra");
const containerCart = document.querySelectorAll(".container-main-cart div");

if(botonFinalizarCompra){
    botonFinalizarCompra.addEventListener("click", async() => {

        await fetch("/carrito/finalizarCompra/",{
            method: 'POST',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        location.href = "/productos/"
    })
}

