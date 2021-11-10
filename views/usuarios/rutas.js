//aca defino cada una de las rutas para usuarios
import Express from 'express';
import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const rutasUsuarios = Express.Router(); // esto me permite crear las rutas

// -------------solicutudes para usuarios-----------

// solicitud de tipo get
rutasUsuarios.route('/usuarios').get((req, res) => { // ruta de tipo get
    console.log("usuarios actualizadas");
    const conexion = getDB();
    conexion.collection('usuarios').find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send("Error al consultar los usuarios");
            console.log("error al consultar los usuarios");
        }
        else {
            res.json(result);
        }
    });
});

// solicitud de tipo post
rutasUsuarios.route('/usuarios/nuevo').post((req, res) => {
    console.log(req);
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        if ( // para que no me deje crear si falta alguno de estos datos
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('correo') &&
            Object.keys(datosProductos).includes('rol') &&
            Object.keys(datosProductos).includes('estado')
        ) {
            const conexion = getDB();
            // implementacion del codigo para la creacion del producto
            conexion.collection('usuarios').insertOne(datosProductos, (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

// solicitud de tipo delete
rutasUsuarios.route('/usuarios/delete').delete((req, res) => {
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    const conexion = getDB();
    conexion.collection('usuarios').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
            console.log('se ha eliminado el usuario');
        }
    });
});


export default rutasUsuarios;