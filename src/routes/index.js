const express = require('express');
//este metodo es usado para acceder a las rutas es del framework de express

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index');
})
//este enruta a una ubicacion raiz  hace una respuesta del servidor y como respuesta manda una respuesta por consola
 
module.exports = router;
