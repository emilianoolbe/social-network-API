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