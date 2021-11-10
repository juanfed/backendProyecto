//aca defino cada una de las rutas de producto
import Express from 'express';
import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

// rutas para la seccion de productos
const rutasProducto = Express.Router();  // me permite crear las rutas

rutasProducto.route('/producto').get((req, res) => { // ruta de tipo get
    console.log("productos actualizados");
    const conexion = getDB();
    conexion.collection("productos").find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send("Error al consultar los productos");
        }
        else {
            res.json(result);
        }
    });
});

// solicitud de tipo patch (para hacer modificaiones)
rutasProducto.route('/producto/edit').patch((req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB();
    conexion
        .collection('productos')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error('error actualizando el producto: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        );
});

// solicitud de tipo post
rutasProducto.route('/producto/nuevo').post((req, res) => {
    console.log(req);
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        if (
            Object.keys(datosProductos).includes('nombre') &&
            Object.keys(datosProductos).includes('descripcion') &&
            Object.keys(datosProductos).includes('valor') &&
            Object.keys(datosProductos).includes('estado')
        ) {
            const conexion = getDB();
            // implementacion del codigo para la creacion del producto
            conexion.collection('productos').insertOne(datosProductos, (err, result) => {
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

//solicitud de tipo delete
rutasProducto.route('/producto/delete').delete((req, res) => {
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    const conexion = getDB();
    conexion.collection('productos').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
            console.log('se ha borrando el producto');
        }
    });
});

export default rutasProducto;