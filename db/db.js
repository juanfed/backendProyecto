// conexion con la base de datos
import { MongoClient, ObjectId } from 'mongodb'; // para conectarnos a la base de datos y trabajar con mongoclient
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // oara que me saque la ruta de la mongo desde el archivo .env que tengo en local

const stringConexion = process.env.DATABASE_URL; // conexion con la base de datos de mongo

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion; // variable global 

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error("Error a la hora de coenctar a la base de datos");
            return 'error';
        }
        conexion = db.db('celulares');
        console.log("conexion exitosa")
        return callback();
    });
}; 

const getDB = () =>{
    return conexion;
}

export { conectarBD, getDB };  