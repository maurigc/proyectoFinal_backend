import { Router } from "express";
import { passport } from "../middlewares/passport.js";
import { logWarn } from "../scripts/log4js.js";
import { usuariosDao } from "../DAOs/index.js";

const router = Router();



//***************** Ruta para mostrar info cuenta ****************//
router.get("/info", async(req, res) => {
    const usuarios = await usuariosDao.getAll();

    const usuario = usuarios.find( user => user.username === req.session.username);

    res.render("pages/infoIndex", {usuario})
})

//***************** Ruta que renderiza formulario para ingresar a la app ****************//
router.get("/", (req, res) => {
    try {
        res.render('pages/loginIndex');
        
    } catch (error) {
        logWarn.error(error);
    }

})


//***************** Ruta que renderiza formulario para registro ****************//
router.get("/registrar", (req, res) => {
    try {
        res.render('pages/registerIndex');
        
    } catch (error) {
        logWarn.error(error);
    }
})


//***************** Ruta para ingresar a la app ****************//
router.post("/login", passport.authenticate("login", {
    failureRedirect: "/registrar"
}), (req, res) => {
    req.session.nombre = req.user.nombre;
    req.session.username = req.user.username;
    req.session.telefono = req.user.telefono;

    res.redirect("/productos/")
})


//***************** Ruta para desloguearse ****************//
router.get("/logout", (req, res) => {
    try {
        req.session.destroy(error => {
            if(error){
                res.status(404).send(error)
            }
        })
    
        res.redirect("/");
        
    } catch (error) {
        logWarn.error(error);
    }
})


//***************** Ruta para Registrarse ****************//
router.post("/registrar", passport.authenticate("register", {
    successRedirect: "/",
    failureRedirect: "/registrar"
}))



export { router };