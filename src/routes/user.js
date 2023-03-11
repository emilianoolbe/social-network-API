// --> Router + Controller + Middlewares <--
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const upload = require('../Middlewares/userMulter');
const validations = require('../Middlewares/userValidation');

// --> Rutas <--

//Todos los usuarios
router.get('/all', upload.single('avatar') ,user.allUsers);

//Usuario por ID
//router.get('/user/:id', user.userById);

//Crear usuario
router.post('/create', validations, user.createUser);

//Editar usuario
//router.put('/user/:id', user.editUser);

//Eliminar usuario
//router.delete('/user/:id', user.deleteUser);

//Login
router.post('/login', user.login);

//Logout
//router.get('/logout', user.logout);

module.exports = router;