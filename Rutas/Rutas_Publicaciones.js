const express = require('express')
const router = express.Router()
const PubModel = require("../schemas/Publicaciones_Schema")
const UsModel = require("../schemas/Usuarios_Schema")
const a =  "@"


// ****************** GET ******************

// Mostar las publicaciones de un usuario
router.get('/PubUs', async (req, res) => {
    const Publicacion = await PubModel.find({Usuario: a+req.query.us}, 'Titulo Publicacion -_id' )
    res.status(302)
    res.send(JSON.stringify(Publicacion, null, 4))
});



// ****************** POST ******************


// Crear una publicacion
router.post('/NewPub', async (req, res)=> {
    const usuarios = await UsModel.findOne({Usuario: a+req.query.us})
    const Publicacion = new PubModel(
        {   id_Usuario: usuarios._id, 
            Usuario: usuarios.Usuario,
            Titulo: req.query.tit,
            Publicacion: req.query.pub,
        }
        );
    await Publicacion.save()
    console.log("Publicacion creada con exito")
    res.status(201)
    res.redirect("https://http.cat/201");
});



// ****************** PATCH ******************


// Actualizar publicacion de un usuario especifico, por medio del titulo de la publicacion
router.patch('/Pubup', async (req, res)=> {
    const Pubicacion = await PubModel.findOneAndUpdate({Usuario: a+req.query.us, Titulo: req.query.tit},{Publicacion: req.query.up})
    console.log("se actualizo la publicacion")
    res.status(202)
    res.redirect("https://http.cat/202");
});

// ****************** DELETE ******************


// Borrar una publicacion de un usuario especifico, por medio del titulo de la publicacion
router.delete('/Pubde', async (req, res) => {
    const usuarios = await PubModel.findOneAndDelete({Usuario: a+req.query.us, Titulo: req.query.tit})
    console.log('la publicacion fue borrado con exito')
    res.status(410)
    res.redirect("https://http.cat/410");
});
    
module.exports = router;