// --> Modelo + validaciones + bcrypt + JWT <--
const User = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

// --> Métodos <--

//Todos los usuarios
const allUsers = (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Controlador user',
        user: req.user
    });
};

//Usuario por ID
const userById = (req, res) => {

};

//Crear usuario
const createUser = async (req, res) => {

    //validación de datos
    let errors = validationResult(req);

    if (errors.isEmpty()) {

        //Control de usuarios duplicados
        let userAllreadyExist = await User.find({
            '$or': [{email: req.body.email}, {nick: req.body.nick}]
        });

        if (userAllreadyExist.length > 0) {
            return res.status(200).json({
                status: 'Error',
                message:'Este email o nick ya estan registrados'
            });
        };

        // --> No hay datos ingresados duplicados <--

        //Cifrado de datos sensibles
        let pwd = await bcrypt.hash(req.body.password, 10);
        req.body.password = pwd;

        //Creo objeto a guardar
        const USERTOSAVE = new User(req.body)
    
        //Guardar usuario en DB - retorno de resultados
        let userStored = await USERTOSAVE.save();
        USERTOSAVE.save()
            .then((userStored) => {
                return res.status(200).json({
                    status: 'Success',
                    message: 'Usuario registrado correctamente',
                    user: userStored
                });
            }).catch((err) => {
                return res.status(500).json({
                    status: 'Erros',
                    message: 'Error al guardar usuario en DB'
                });
            });         
    
    }else{

        //Muestro errores de validación
        return res.status(400).json({
            status: 'Se han encontrado errores en la validación de los datos ingresados',
            message: errors.mapped()
        });

    };
    

    
};

//Editar usuario
const editUser = (req, res) => {

};

//Eliminar usuario
const deleteUser = (req, res) => {

};

//Login
const login = async (req, res) => {

    //Validaciones
    let errors = validationResult(req)

    if (errors.isEmpty()) {
        
        //Valido si existe el usuario
        const USERTOLOGIN = await User.findOne({email: req.body.email})
        if (!USERTOLOGIN) {
            return res.status(400).json({
                status: 'Error',
                message: 'El email que ha ingresado no existe, debe registrarse primero para poder loguearse'
            });
        };
        //Valido contraseña de usuario
        let pwd = bcrypt.compareSync(req.body.password, USERTOLOGIN.password)
        if (!pwd){
            return res.status(400).json({
                status: 'Error',
                message: 'Credenciales incorrectas'
            });
        };

        //Conseguir Token
        const TOKEN = jwt.createToken(USERTOLOGIN);
    
        //Devolver resultados
        return res.status(200).json({
            status: 'Success',
            message: 'Usuario logueado correctamente',
            user: {
                id: USERTOLOGIN._id,
                name: USERTOLOGIN.name,
                nick: USERTOLOGIN.nick,     
            },
            TOKEN
        });

    }else{
        return res.status(400).json({
            status: 'Error',
            message: errors.mapped()
        });
    };
};

//Perfil
const profile = async (req, res) => {

    //Consultar a la DB datos de usuarios por ID
    try {
        const USER = await User.findById(req.params.id)
        return res.status(200).json({
            status: 'Success',
            message: 'Usuario logueado',
            user: {
                id: USER._id,
                name: USER.name,
                nick: USER.nick,
                email: USER.email,
                avatar: USER.avatar,
                created_at: USER.created_at
            }
        });

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Error al realizar consulta a la base de datos',
            error
        });
    };
    

    //Devolver resultados

};

//Logout
const logout = (req, res) => {

};

module.exports = {allUsers, userById, createUser, editUser, deleteUser, login, profile, logout};

