// --> Router + Controller + Middlewares <--
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const upload = require('../Middlewares/userMulter');
const validations = require('../Middlewares/userValidation');
const loginValidations = require('../middlewares/loginValidations');
const auth = require('../middlewares/auth');

// --> Rutas <--

//Todos los usuarios
router.get('/all/:page?', auth, user.allUsers);

//Todos los usuarios con soft delete
router.get('/deleted', user.allDelete);

//Usuario por ID
router.get('/user/:id', user.userById);

//Registro usuario
router.post('/create', validations, guest, user.createUser);

//Editar usuario
router.put('/edit', auth, validations, user.editUser);

//Soft Delete usuario
router.delete('/delete', auth, user.userSoftDelete);

//Recuperar Usuario
router.post('/recover', loginValidations, user.userRecover);

//Hard Delete usuario
router.delete('/hardDelete', auth, loginValidations, user.hardDeleteUser);

//Subida de avatar
router.post('/upload', auth, upload.single('avatar'), user.upload);

//Avatar
router.get('/avatar/:file', auth, user.avatars);

//Login
router.post('/login', validationsLogin, user.login);

//Perfil
router.get('/profile/:id', auth, user.profile);

//Perfil
router.get('/profile/:id', auth, user.profile);

//Logout
//router.get('/logout', user.logout);

module.exports = router;