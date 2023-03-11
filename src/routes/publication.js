// --> Router + controllador + middlewares <--
const express = require('express');
const router = express.Router();
const publication = require('../controllers/publication');

// --> Rutas <--

//Todas las publicaciones
router.get('/all', publication.allPublications)
//Publicacion por id

// --> CRUD <--

//Nueva publicación

//Editar publicación

//Eliminar publicación


module.exports = router;