// --> JWT + Moment + Clave secreta <--
const jwt = require('jwt-simple');
const moment = require('moment');
const {secret} = require('../services/jwt');


//Función de auntentificación
const auth = (req, res, next) => {
    
    //Comprobar si llega la cabecera de auth -> El valor de req.headers.authotizaation es el token <-
    const  cabecera = req.headers.authorization;

    if (!cabecera) {
        return res.status(403).json({
            status: 'Error',
            message: 'La petición no tiene la cabecera de autentificación'
        });
    };

    //Limpiar token -> puede venir con comillas <-
    const token = cabecera.replace(/['"] +/g, '');

    //Decodificar el token
    try {
        let payload = jwt.decode(token, secret);

        //Comprobar expiración
        if (payload.exp <= moment().unix()) {
            return res.status(401).json({
                status: 'Error',
                message: 'El token ha expirado'
            });
        };

        //Agregar datos de usario a request
        req.user = payload;

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Token inválido'
        })
    };
    
    //NEXT()
    next();
};

module.exports = auth;
