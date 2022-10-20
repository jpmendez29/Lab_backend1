const express = require('express')
const router = express.Router()
const UsModel = require("../schemas/Usuarios_Schema")



// ****************** GET ******************


// Mostar todos los usuarios
router.get('/Usall', async (req, res) => {
    const usuarios = await UsModel.find({}, '-_id')
    res.status(302)
    res.send(JSON.stringify(usuarios, null, 4))
});

// Mostrar usuario especifico
router.get('/Usone', async (req, res) => {
    const usuarios = await UsModel.find({Usuario: req.query.us }, '-_id')
    res.status(302)
    res.send('usuario: '+ JSON.stringify(usuarios, null, 4))
});



// ****************** POST ******************


// Crear un usuario
router.post('/UsCr', async (req, res)=> {
    const Usuario = new UsModel(
        {   Usuario: req.query.us,
            Correo: req.query.em,
            Contraseña: req.query.con,
        }
        );
    await Usuario.save()
    console.log("ususario creado con exito")
    res.status(201)
    res.redirect("https://http.cat/201");
});



// ****************** PATCH ******************


// Actualizar el usuario (@) de un usuario especifico, por medio de su usuario (@)
router.patch('/Usup', async (req, res)=> {
    const usuarios = await UsModel.findOneAndUpdate({Usuario: req.query.us },{Usuario: req.query.up})
    console.log("se actualizo el usuario")
    res.status(202)
    res.redirect("https://http.cat/202");
});



// Actualizar el correo de un usuario especifico, por medio de su usuario (@)
router.patch('/Usupem', async (req, res)=> {
    const usuarios = await UsModel.findOneAndUpdate({Usuario: req.query.us },{Correo: req.query.up})
    console.log("se actualizo el correo")
    res.status(202)
    res.redirect("https://http.cat/202");
});



// Actualizar la contraseña de un usuario especifico, por medio de su usuario (@)
router.patch('/Usuppas', async (req, res)=> {
    const usuarios = await UsModel.findOneAndUpdate({Usuario: req.query.us },{Contraseña: req.query.up})
    console.log("se actualizo la contraseña")
    res.status(202)
    res.redirect("https://http.cat/202");
    
});



// ****************** DELETE ******************


// Borrar un usuario especifico
router.delete('/Usde', async (req, res) => {
    const usuarios = await UsModel.findOneAndDelete({Usuario: req.query.us})
    console.log('el ususario fue borrado con exito')
    res.status(410)
    res.redirect("https://http.cat/410");
});
  


module.exports = router;