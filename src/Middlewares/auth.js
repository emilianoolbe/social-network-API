// --> JWT + Moment + Clave secreta <--
<<<<<<< HEAD
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
=======
const jwt = require("jwt-simple");
const { secret } = require("../services/jwt");
const moment = require("moment");

//Función de auntentificación
const auth = (req, res, next) => {

  //Comprobar si llega la cabecera de auth -> El valor de req.headers.authotization es el token <-
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      status: "Error",
      message: "La petición no tiene la cabecera de autentificación",
    });
  }

  //Limpiar token -> puede venir con comillas <-

  let encodedInfo = token.replace(/['"] +/g, "");

  //Decodificación del Token
  try {
    let payload = jwt.decode(encodedInfo, secret);

    //Comprobar expiración
    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        status: "Error",
        message: "El token ha expirado",
      });
    };

    //Agregar datos de usario a request
    req.user = payload;

  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "Token inválido",
      error
    });
  }

  next();
>>>>>>> 8fbcdbec78a867cd1a85d555c070a0855f7c21e2
};

module.exports = auth;
