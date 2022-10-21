const express = require('express')
const router = express.Router()
const PubModel = require("../schemas/Publicaciones_Schema")
const UsModel = require("../schemas/Usuarios_Schema")



// ****************** GET ******************


// Mostar las publicaciones de un usuario
router.get('/PubUs', async (req, res) => {
    const Publicacion = await PubModel.find({Usuario: req.query.us}, 'Publicacion -_id' )
    res.status(302)
    res.send(JSON.stringify(Publicacion, null, 4))
});





// ****************** POST ******************


// Crear un usuario
router.post('/NewPub', async (req, res)=> {
    const usuarios = await UsModel.findOne({Usuario: req.query.us})
    const Publicacion = new PubModel(
        {   id_Usuario: usuarios._id, 
            Usuario: usuarios.Usuario,
            Publicacion: req.query.pub,
        }
        );
    await Publicacion.save()
    console.log("Publicacion creada con exito")
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