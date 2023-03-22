// --> Router + Controller + Middlewares <--
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const upload = require('../Middlewares/userMulter');
const validations = require('../Middlewares/userValidation');
const auth = require('../middlewares/auth');

// --> Rutas <--

//Todos los usuarios
router.get('/all/:page?', auth, user.allUsers);

//Usuario por ID
router.get('/user/:id', user.userById);

//Crear usuario
router.post('/create', validations, user.createUser);

//Editar usuario
router.put('/edit', auth, validations, user.editUser);

//Eliminar usuario
//router.delete('/delete/:id', user.deleteUser);

//Subida de avatar
router.post('/upload', auth, upload.single('avatar'), user.upload);

//Avatar
router.get('/avatar/:file', auth, user.avatars);

//Login
router.post('/login', user.login);

//Perfil
router.get('/profile/:id', auth, user.profile);

//Logout
//router.get('/logout', user.logout);

module.exports = router;