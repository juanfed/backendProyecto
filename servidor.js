import Express  from "express";

// Creo la aplicacion del backend
const app = Express();

// abro el puerto en donde se ejecutará
app.listen(5000, () =>{
    console.log("ejecutando el servidor");
});