// confugarcion de expresss
import Express from "express";
import { MongoClient, ObjectId } from 'mongodb'; // para conectarnos a la base de datos y trabajar con mongoclient
import { conectarBD, getDB } from './db/db.js';
import Cors from 'cors';
import dotenv from 'dotenv';
import rutasProducto from "./views/productos/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";

dotenv.config({ path: './.env' }) // oara que me saque la ruta de la mongo desde el archivo .env que tengo en local

// Creo la aplicacion del backend
const app = Express();

const port = process.env.PORT || 5000;

app.use(Express.json()) // para que la solicitud se pase por aca y se desgloce
app.use(Cors());

app.use(rutasProducto); // importamos las rutas de roducto
app.use(rutasUsuarios); // importamos las rutas para usuarios
app.use(rutasVentas);   // importamos las rutas para vetas

const main = () => { // se conecta y me retorna en la base de datos
  return app.listen(port, () => { // abro el puerto en donde se ejecutará
    console.log(`Ejecutando el servidor en puerto: ${process.env.PORT}`);
  });
};

conectarBD(main); // saco la logica de conexion y dejar solo las funciones y configuraciones de expless