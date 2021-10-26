import Express from "express";
import { MongoClient } from 'mongodb'; // para conectarnos a la base de datos y trabajar con mongoclient

const stringConexion =  //conexion con la basse de datos
  'mongodb+srv://juanfed:0707MT60FZxSp35@proyectomisiontic.vsvmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let conexion; // variable global


// Creo la aplicacion del backend
const app = Express();
app.use(Express.json()) // para que la solicitud se pase por aca y se desgloce

app.get('/producto', (req, res) => { // ruta de tipo get
  console.log("estoy haciendo  una peticion get");
  conexion.collection("productos").find({}).limit(50).toArray((err, result) =>{
    if(err){
      res.status(500).send("Error al consultar los productos");
    }
    else{
      res.json(result);
    }
  });
});

// solicitud de tipo post
app.post('/producto/nuevo', (req, res) => {
  console.log(req);
  const datosProductos = req.body;
  console.log('llaves: ', Object.keys(datosProductos));
  try {
    if (
      Object.keys(datosProductos).includes('id') &&
      Object.keys(datosProductos).includes('nombre') &&
      Object.keys(datosProductos).includes('descripcion') &&
      Object.keys(datosProductos).includes('valor') &&
      Object.keys(datosProductos).includes('estado')
    ) {
      // implementacion del codigo para la creacion del producto
      conexion.collection('productos').insertOne(datosProductos, (err, result) => {
        if (err) {
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      })

      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});



const main = () => { // se conecta y me retorna en la base de datos

  client.connect((err, db) => {
    if (err) {
      console.error("Error a la hora de coenctar a la base de datos");
    }
    conexion = db.db('celulares');
    console.log("conexion exitosa")
    return app.listen(5000, () => { // abro el puerto en donde se ejecutará
      console.log("ejecutando el servidor");
    });
  })

};

main(); //llamo a ejecutar la funcion main