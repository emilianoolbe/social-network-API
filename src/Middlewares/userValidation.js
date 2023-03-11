const {body} = require('express-validator');

let errors = [
    body('name')
        .notEmpty().withMessage('Debe agregar un nombre')
        .isLength({min: 4, max:15}).withMessage('El nombre debe tener un min de 4 y max de 10 caracteres'),
    body('nick')
        .notEmpty().withMessage('Debe agregar un NickName')
        .isLength({min: 2, max:20}).withMessage('El nick debe tener un min de 2 y max de 10 caracteres'),
    body('email')
        .notEmpty().withMessage('Debe ingresar un email')
        .isEmail().withMessage('Debe ingresar un valor de tipo email: ejemplo@ejemplo.com'),
    body('password').notEmpty().withMessage('Debe agregar un password')

];

module.exports = errors;