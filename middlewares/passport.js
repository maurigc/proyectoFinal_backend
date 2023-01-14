import passport from "passport";
import passportLocal from "passport-local";
import { usuariosDao,carritosDao } from "../DAOs/index.js";
import { comparar, encriptar } from "../scripts/encritptarContraseña.js";
import { transport } from "../scripts/nodemailer.js";
import { logWarn } from "../scripts/log4js.js";


const LocalStrategy = passportLocal.Strategy;


passport.use("login", new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done ) => {
    try {
        const usuarios = await usuariosDao.getAll();
    
        const user = usuarios.find( user => user.username === username);
    
        if(user){
            const validarPassword = comparar(user, password);
    
            if(validarPassword){
                return done(null, user);
    
            }else{
                return done(null, false);
            }
    
        }else{
            return done(null, false);
    
        }
        
    } catch (error) {
        logWarn.error(error);
    }
}))


passport.use("register", new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
    try {
        const usuarios = await usuariosDao.getAll();
    
        const user = usuarios.find( user => user.username === username);
    
        if(user){
            return done(null, false);
        }else{
            const idCarrito = await carritosDao.createCart();

            const newUser = {
                _id: `${usuarios.length === 0 ? 1 : usuarios.length + 1}`,
                username,
                password: encriptar(password),
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                avatar: req.body.avatar,
                idCarrito: idCarrito
            }
    
            await usuariosDao.save(newUser);

            const mailOptions = {
                from: 'Ecommerce-c32125',
                to: username,
                subject: 'Nuevo registro',
                html: (`
                    <h1 style="color: green;">Registradx con éxito!</h1>
                    <h2>Detalles de la cuenta:</h2>
                    <ul>
                        <li style="font-weith: bolder, font-size: 20px">Nombre:<span style="color: gray"> ${req.body.nombre}</span></li>
                        <li style="font-weith: bolder, font-size: 20px">Dirección:<span style="color: gray"> ${req.body.direccion}</span></li>
                        <li style="font-weith: bolder, font-size: 20px">Edad:<span style="color: gray"> ${req.body.edad}</span></li>
                        <li style="font-weith: bolder, font-size: 20px">Telefono:<span style="color: gray"> ${req.body.telefono}</span></li>
                    </ul>
                    `)
            }

            await transport.sendMail(mailOptions);

            return done(null, newUser);
        }
        
    } catch (error) {
        logWarn.error(error);
    }
}))


passport.serializeUser( (user, done) => {
    done(null, user._id);

})

passport.deserializeUser( async(id, done) => {
    let user = await usuariosDao.getById(id);

    done(null, user)

})

export { passport };