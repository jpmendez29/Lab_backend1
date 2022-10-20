const express = require('express')
const router = express.Router()
const UsModel = require("../schemas/Like_Schema")

router.get('/user', async (req, res) => {
    res.send('Hello World!');
});

router.post('/create', async (req, res)=> {
    const Usuario = new UsModel(
        {   Usuario: 'Zildjian',
            Correo: "jpmendez@hotmail.com",
            Contraseña: "hola1234",
            Fecha_creacion: Date.now()
        }
        );
    await Usuario.save()
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/notes");
    res.send('Got a POST request');
});
  
router.put('/user', async (req, res)=> {
    res.send('Got a PUT request at /user');
});

router.delete('/user', async (req, res) => {
    res.send('Got a DELETE request at /user');
});
  
module.exports = router;