import Express from "express";
import { MongoClient, ObjectId } from 'mongodb'; // para conectarnos a la base de datos y trabajar con mongoclient
import { conectarBD, getDB } from './db/db.js';
import Cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }) // oara que me saque la ruta de la mongo desde el archivo .env que tengo en local

// Creo la aplicacion del backend
const app = Express();

app.use(Express.json()) // para que la solicitud se pase por aca y se desgloce
app.use(Cors());

app.get('/producto', (req, res) => { // ruta de tipo get
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

// solicitud de tipo patch
app.patch('/producto/edit', (req, res) => {
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
app.post('/producto/nuevo', (req, res) => {
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
app.delete('/producto/delete', (req, res) => {
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


// -------------solicutudes para ventas-----------

//solicitud de tipo post
app.post('/ventas/nuevo', (req, res) => {
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
app.delete('/ventas/delete', (req, res) => {
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
app.get('/ventas', (req, res) => { // ruta de tipo get
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

// -------------solicutudes para usuarios-----------

// solicitud de tipo get
app.get('/usuarios', (req, res) => { // ruta de tipo get
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
app.post('/usuarios/nuevo', (req, res) => {
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
app.delete('/usuarios/delete', (req, res) => {
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




const main = () => { // se conecta y me retorna en la base de datos
  return app.listen(process.env.PORT, () => { // abro el puerto en donde se ejecutará
    console.log(`Ejecutando el servidor en puerto: ${process.env.PORT}`);
  });
};

conectarBD(main); // saco la logica de conexion y dejar solo las funciones y configuraciones de expless