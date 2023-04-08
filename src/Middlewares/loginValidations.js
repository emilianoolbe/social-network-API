const {body} = require('express-validator');

let errors = [
    body('email')
        .notEmpty().withMessage('Debe ingresar un email')
        .isEmail().withMessage('Debe ingresar un valor de tipo email: ejemplo@ejemplo.com'),
    body('password').notEmpty().withMessage('Debe agregar un password')

];

module.exports = errors;