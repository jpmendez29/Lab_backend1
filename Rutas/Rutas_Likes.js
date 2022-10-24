const express = require('express')
const router = express.Router()
const UsModel = require("../schemas/Usuarios_Schema")
const LiModel = require("../schemas/Like_Schema")
const PubModel = require("../schemas/Publicaciones_Schema")
const a = "@"


// ****************** GET ******************


// Ver publicaciones likeadas de un usuario 

router.get('/Like', async (req, res) => {
    let publc = []
    const Likes = await LiModel.aggregate([
        {$lookup:{
            from: "Publicaciones",
            localField: "id_Publicacion",
            foreignField: "_id",
            pipeline: [{$sort: {updatedAt:-1 }}, {$project: { _id: 0, id_Usuario: 0, createdAt:0}}],
            as: "Likes"
            }
        },
        { $match: {Usuario : a+req.query.us} },
    ])

    Likes.forEach(b => {
        b.Likes.forEach(ca => {
            publc.push(ca)
        })
    });
    
    res.status(302)
    res.send(JSON.stringify(publc, null, 4))
});


// ****************** POST ******************


// Dar like a una publicacion 

router.post('/Clike', async (req, res)=> {
    const usuarios = await UsModel.findOne({Usuario: a+req.query.us })
    const publicacion = await PubModel.findByIdAndUpdate(req.query.idp, { $inc: { Likes: 1 }})
    const Likes = new LiModel(
        {
            id_Publicacion: req.query.idp,
            id_Usuario: usuarios._id,
            Usuario: usuarios.Usuario,
        }
        );
    await Likes.save()
    console.log("Like creado con exito")
    res.status(201)
    res.redirect("https://http.cat/201");
});


// ****************** DELETE ******************


// Eliminar un like de una publicacion

router.delete('/Dlike', async (req, res) => {
    const Likes = await LiModel.findOneAndDelete({Usuario: a+req.query.us , id_Publicacion: req.query.idp })
    const publicacion = await PubModel.findByIdAndUpdate(req.query.idp, { $inc: { Likes: -1 }})
    console.log("Like eliminado con exito")
    res.status(201)
    res.redirect("https://http.cat/201");
});

module.exports = router;