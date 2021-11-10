//aca defino cada una de las rutas para ventas
import Express from 'express';
import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';


// rutas para la seccion de ventas
const rutasVentas = Express.Router();

// -------------solicutudes para ventas-----------

//solicitud de tipo post
rutasVentas.route('/ventas/nuevo').post((req, res) => {
    console.log(req);
    const datosProductos = req.body;
    console.log('llaves: ', Object.keys(datosProductos));
    try {
        if (
            Object.keys(datosProductos).includes('valorTotal') &&
            Object.keys(datosProductos).includes('cantidad') &&
            Object.keys(datosProductos).includes('valorUnidad') &&
            Object.keys(datosProductos).includes('fechaVenta') &&
            Object.keys(datosProductos).includes('idCliente') &&
            Object.keys(datosProductos).includes('nombreCliente') &&
            Object.keys(datosProductos).includes('estado')
        ) {
            const conexion = getDB();
            // implementacion del codigo para la creacion del producto
            conexion.collection('ventas').insertOne(datosProductos, (err, result) => {
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
rutasVentas.route('/ventas/delete').delete((req, res) => {
    const conexion = getDB();
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    conexion.collection('ventas').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
            console.log('se ha eliminado la venta');
        }
    });
});

// solictud de tipo get
rutasVentas.route('/ventas').get((req, res) => { // ruta de tipo get
    console.log("ventas actualizadas");
    const conexion = getDB();
    conexion.collection('ventas').find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send("Error al consultar las ventas");
        }
        else {
            res.json(result);
        }
    });
});

export default rutasVentas;