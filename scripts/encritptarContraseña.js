import bCrypt from "bcrypt";


const encriptar = ( contraseña ) => {
    return bCrypt.hashSync(contraseña, bCrypt.genSaltSync(10), null)
}


const comparar = (user, password) => {
    return bCrypt.compareSync(password, user.password)
}


export { encriptar, comparar }