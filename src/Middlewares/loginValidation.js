const {body} = require('express-validator');

const errors = [
    body('email')
        .notEmpty().withMessage('Debe ingresar un email al campo')
        .isEmail().withMessage('Ingrese un valor correcto de tipo email: ejemplo@ejemplo.com'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña en el campo')
];

module.exports = errors;