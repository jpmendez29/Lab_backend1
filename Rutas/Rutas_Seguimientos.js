const express = require('express')
const router = express.Router()
const SegModel = require("../schemas/Seguimiento_Schema")
const UsModel = require("../schemas/Usuarios_Schema")
const a =  "@"

// ****************** GET ******************

// mostrar todos los seguimientos, de todos los ususarios

router.get('/Usall', async (req, res) => {
    const seguimientos = await SegModel.find({}, '-_id')
    res.status(302)
    res.send(JSON.stringify(seguimientos, null, 4))
});


// Mostrar los seguidores de un usuario

router.get('/Followers', async (req, res) => {
    const usuario = await UsModel.findOne({Usuario: a+req.query.us})
    const Followers = await SegModel.find({id_usuario_seguido: usuario._id}, 'Usuario_seguidor -_id' )
    res.status(302)
    res.send(JSON.stringify(Followers, null, 4))
});


// Mostrar a quien sigue un usuario

router.get('/Following', async (req, res) => {
    const usuario = await UsModel.findOne({Usuario: a+req.query.us})
    const Following = await SegModel.find({id_usuario_seguidor: usuario._id}, 'Usuario_seguido -_id' )
    res.status(302)
    res.send(JSON.stringify(Following, null, 4))
});


// ****************** POST ******************


// seguir a un usuario 
router.post('/Follow', async (req, res)=> {
    const Seguidor = await UsModel.findOne({Usuario: a+req.query.seguidor})
    console.log("Seguidor: "+Seguidor)
    const Seguido = await UsModel.findOne({Usuario: a+req.query.seguido})
    console.log("Seguido: "+Seguido)
    const Follow = new SegModel(
        {   
        id_usuario_seguidor: Seguidor._id,
        Usuario_seguidor: Seguidor.Usuario ,
        id_usuario_seguido: Seguido._id ,
        Usuario_seguido: Seguido.Usuario ,
        }
        );

    await Follow.save()
    console.log("Seguimiento creada con exito")
    res.status(201)
    res.redirect("https://http.cat/201");
});


// ****************** DELETE ******************


// Dejar de seguir a un usuario
router.delete('/Delfollow', async (req, res) => {
    const usuario_seguidor = await UsModel.findOne({Usuario: a+req.query.us})
    const usuario_seguido = await UsModel.findOne({Usuario: a+req.query.usf})
    const Vinculo = await SegModel.findOneAndDelete({id_usuario_seguidor: usuario_seguidor._id, id_usuario_seguido: usuario_seguido._id})
    console.log('Vinculo borrado con exito')
    res.status(410)
    res.redirect("https://http.cat/410");
});


module.exports = router;