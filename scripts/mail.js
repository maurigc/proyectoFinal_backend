const crearHtmlMail = (productos) => {
    let ps = (`<h1 style="color: green;">Compra realizada con éxito!</h1>
    <p>Tu pedido esta siendo preparado.<p/>
    <h2>Detalles de la compra:</h2>`)
    productos.forEach( producto => {
        ps += `<p> ${producto.nombre} </p>`
    });

    return ps
}

const crearBodyWhatsapp = (productos) => {
    let cuerpo = 'Compra realizada con éxito! Tu pedido esta siendo preparado. Detalles de la compra: '
    productos.forEach( producto  => {
        cuerpo += `${producto.nombre} `
    })

    return cuerpo
}


export { crearHtmlMail, crearBodyWhatsapp }