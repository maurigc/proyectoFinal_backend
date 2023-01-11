import express from "express";
import { router as rutasProductos } from "./routes/RutasProductos.js";
import { router as rutasCarrito } from "./routes/RutasCarrito.js";
import { router as rutasMain } from "./routes/RutasMain.js";
import { passport } from "./middlewares/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from 'dotenv';
import { config } from "./config.js";


dotenv.config();
const app = express();

///////////////////// Midleware //////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    secret: process.env.SECRET_WORD,
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO_ATLAS,
        mongoOptions: config.mongoDb.options
    }),
    cookie: {
        maxAge: 60000 * 10
    },
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

///////////////////// Configuracion de motor de plantilla "Ejs" //////////////////////
app.set("views", "./public/views");
app.set("view engine", "ejs");


///////////////////// Rutas //////////////////////
app.use("/", rutasMain)

app.use("/productos", rutasProductos);

app.use("/carrito", rutasCarrito)


export { app };