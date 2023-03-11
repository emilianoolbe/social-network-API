// --> Express + router + controlador + middlewares <--
const express = require('express');
const router = express.Router();
const follow = require('../controllers/follow');

// --> Rutas <--

// Todos los follows
router.get('/all', follow.followAlls)
// Follow por ID

// --> CRUD <--

//Nuevo follow

//Eliminar follow

module.exports = router;



