// --> JWT + Moment + Clave secreta <--
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
};

module.exports = auth;
