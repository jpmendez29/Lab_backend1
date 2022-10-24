require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const [user,pasw] = [process.env.USER, process.env.PASW]


// MIDDLEWARE JSON
app.use(express.json());

// CONEXION MONGO
mongoose.connect(
    "mongodb+srv://"+user+":"+pasw+"pn@labbackend.wsxmbzf.mongodb.net/Twitter?retryWrites=true&w=majority"
    )
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch((e) => {
    console.log(e)
    console.log("Error de conexion")
})

// DECLARACION DE RUTA
const routeUs = require('./Rutas/Rutas_Usuarios')
const routePub = require('./Rutas/Rutas_Publicaciones')
const routeSeg = require('./Rutas/Rutas_Seguimientos')
const routeLikes = require('./Rutas/Rutas_Likes')
app.use("/Usuarios", routeUs)
app.use("/Publicaciones", routePub)
app.use("/Seguimientos", routeSeg)
app.use("/Likes", routeLikes)

// ABRIR PUERTO PARA APP
app.listen(3000, (err) => {
    if(err){
        console.log("Error", err)
        return
    }
    console.log("listening on port 3000")
});
