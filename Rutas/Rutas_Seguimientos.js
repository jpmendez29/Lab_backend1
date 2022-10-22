const express = require('express')
const router = express.Router()
const SegModel = require("../schemas/Seguimiento_Schema")
const UsModel = require("../schemas/Usuarios_Schema")
const a =  "@"



router.get('/Followers', async (req, res) => {
    const Followers = await SegModel.find({Usuario_seguido: a+req.query.us}, 'Usuario_seguidor -_id' )
    res.status(302)
    res.send(JSON.stringify(Followers, null, 4))
});

router.get('/Following', async (req, res) => {
    const Following = await SegModel.find({Usuario_seguidor: a+req.query.us}, 'Usuario_seguido -_id' )
    res.status(302)
    res.send(JSON.stringify(Following, null, 4))
});

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

router.delete('/Delfollow', async (req, res) => {
    const Vinculo = await SegModel.findOneAndDelete({Usuario_seguidor: a+req.query.us, Usuario_seguido: a+req.query.usf})
    console.log('Vinculo borrado con exito')
    res.status(410)
    res.redirect("https://http.cat/410");
});


module.exports = router;