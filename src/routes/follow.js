// --> Express + router + controlador + middlewares <--
const express = require('express');
const router = express.Router();
const follow = require('../controllers/follow');
const auth = require('../middlewares/auth');

// --> Rutas <--

//Nuevo seguidor
router.post('/save', auth, follow.followTo);

//Eliminar seguidor
router.delete('/unfollow', auth, follow.unFollow);

//A quien sigo?
router.get('/myfollows', auth, follow.myFollows);

//Quién me sigue?
router.get('/myfollowers', auth, follow.myFollowers);


module.exports = router;



