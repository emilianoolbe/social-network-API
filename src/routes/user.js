// --> Router + Controller + Middlewares <--
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

// --> Rutas <--

//Todos los usuarios
router.get('/all' ,user.allUsers);

//Usuario por ID
router.get('/user/:id', user.userById);

//Crear usuario
router.post('/create', user.createUser);

//Editar usuario
router.put('/user/:id', user.editUser);

//Eliminar usuario
router.delete('/user/:id', user.deleteUser);

//Login
router.get('/login', user.login);

//Logout
router.get('/logout', user.logout);