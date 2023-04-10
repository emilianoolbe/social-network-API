<<<<<<< HEAD
// --> Dependencias <--
const jwt = require('jwt-simple');
const moment = require('moment');

//Clave secreta
const secret = 'PalabraSecreta_social_Network_6350Vishera';

//Función generadora de tokens
const createToken = (user) => {

    // Payload es el objeto que va a guardar datos del usuario
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    
    //JWT token codificado
    return jwt.encode(payload, secret);
};

module.exports = {createToken, secret};

//29242152
=======
// --> JWT + Moment <--
const jwt = require('jwt-simple');
const moment = require('moment');

// --> Clave secreta <--
let secret = 'PalabraSecreta_social_Network_6350Vishera';

// --> Función generadora de Tokens <--

const createToken = (user) => {

    // Payload (objeto a almacenar)
    let payload = {
        id: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix() 
    };

    //Codificación Token
    return jwt.encode(payload, secret);
};

module.exports = {createToken, secret};
>>>>>>> 8fbcdbec78a867cd1a85d555c070a0855f7c21e2
