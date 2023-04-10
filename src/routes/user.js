// --> Router + Controller + Middlewares <--
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const upload = require('../middlewares/userMulter');
const validations = require('../middlewares/userValidation');
const validationsLogin = require('../middlewares/loginValidation');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

// --> Rutas <--

//Todos los usuarios
router.get('/all', auth, upload.single('avatar') ,user.allUsers);

//Usuario por ID
//router.get('/user/:id', user.userById);

//Registro usuario
router.post('/create', validations, guest, user.createUser);

//Editar usuario
//router.put('/user/:id', user.editUser);

//Eliminar usuario
//router.delete('/user/:id', user.deleteUser);

//Login
router.post('/login', validationsLogin, user.login);

//Perfil
router.get('/profile/:id', auth, user.profile);

//Logout
//router.get('/logout', user.logout);

module.exports = router;