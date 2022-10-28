const express = require('express')
const router = express.Router()
const PubModel = require("../schemas/Publicaciones_Schema")
const UsModel = require("../schemas/Usuarios_Schema")
const SegModel = require("../schemas/Seguimiento_Schema")
const a =  "@"


// ****************** GET ******************


// Mostar las publicaciones de un usuario

router.get('/PubUs', async (req, res) => {
    const usuario = await UsModel.findOne({Usuario: a+req.query.us})
    const Publicacion = await PubModel.find({id_usuario: usuario._id}, 'Titulo Publicacion -_id Likes' )
    res.status(302)
    res.send(JSON.stringify(Publicacion, null, 4))
});


// Mostrar todas las publicaciones de todos los usuarios 

router.get('/Puball', async (req, res) => {
    const usuarios = await PubModel.find({}, 'Usuario -_id Titulo Publicacion Likes')
    res.status(302)
    res.send(JSON.stringify(usuarios, null, 4))
});


// Mostrar el timeline de un usuario 

/*router.get('/Timeline', async (req, res) => {
    let publc = []
    const time = await SegModel.aggregate([
        {$lookup:{
            from: "Publicaciones",
            localField: "Usuario_seguido",
            foreignField: "Usuario",
            pipeline: [{$sort: {updatedAt:-1 }}, {$project: { _id: 0, id_Usuario: 0, createdAt:0}}],
            as: "timeline"
            }
        },
        { $match: {Usuario_seguidor : a+req.query.us} },
    ])

    time.forEach(b => {
        b.timeline.forEach(ca => {
            publc.push(ca)
        })
    });

    publc.sort((p1, p2) => (p1.updatedAt < p2.updatedAt) ? 1 : (p1.updatedAt > p2.updatedAt) ? -1 : 0)
    res.status(302)
    res.send(JSON.stringify(publc, null, 4))
});*/

router.get('/Timeline', async (req, res) => {
    const usuario = await UsModel.findOne({Usuario: a+req.query.us})
    const time = await SegModel.aggregate([
        {$lookup:{
            from: "Publicaciones",
            localField: "Usuario_seguido",
            foreignField: "Usuario",
            pipeline: [{$project: { _id: 0, id_Usuario: 0, createdAt:0}}],
            as: "timeline"
            },  
        },
        { $match: {id_usuario_seguidor : usuario._id}},
        { $unwind: "$timeline"}
    ])
    const timeline = time.map(x => x.timeline).sort((p1, p2) => (p1.updatedAt < p2.updatedAt) ? 1 : (p1.updatedAt > p2.updatedAt) ? -1 : 0)
    res.status(302)
    res.send(JSON.stringify(timeline, null, 4))
});


// ****************** POST ******************


// Crear una publicacion para un usuario especifico

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


// Actualizar publicacion de un usuario especifico

router.patch('/Pubup', async (req, res)=> {
    const Pubicacion = await PubModel.findOneAndUpdate({id: req.query._id},{Publicacion: req.query.up})
    console.log("se actualizo la publicacion")
    res.status(202)
    res.redirect("https://http.cat/202");
});


// ****************** DELETE ******************


// Borrar una publicacion de un usuario especifico, por medio del titulo de la publicacion

router.delete('/Pubde', async (req, res) => {
    const usuarios = await PubModel.findOneAndDelete({_id: req.query._id})
    console.log('la publicacion fue borrado con exito')
    res.status(410)
    res.redirect("https://http.cat/410");
});


module.exports = router;