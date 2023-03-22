// --> Modelo + validaciones + bcrypt + jwtMethod + mongoose-pagination + JWT<--
const User = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwtMethod = require('../services/jwt');
const mongoosePagination = require('mongoose-pagination');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// --> Métodos <--

//Todos los usuarios - dividos por pág.
const allUsers = async (req, res) => {
  
    //Primero verifico que página se ingresó - de lo contrario hardcodeo a 1
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    };

    //Convierto el string que llega a n°
    page = parseInt(page)

    //Consulta con mongoose paginate
    let userPerPage = 5
    try {
        const USERS = await User.find().sort('_id')
        const PAGINATION = await User.find().sort('_id').paginate(page, userPerPage)
          
        return res.status(200).json({
            status: 'Success',
            Page: page,
            TotalUsers: USERS.length,
            TotalPerPage: userPerPage,
            Pages: Math.ceil(USERS.length / userPerPage) ,
            Users: PAGINATION
        });

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Usuarios no disponibles'
        });
    };
};

//Usuario por ID
const userById = async(req, res) => {
    try {
        const USER = await User.findById(req.params.id);
        return res.status(200).json({
            status: 'Success',
            message: 'Usuario encontrado',
            USER
        });

    } catch (error) {
        res.status(404).json({
            status: 'Error',
            message: 'Usuario no encontrado',
            error: error
        });
    };
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
const editUser = async (req, res) => {

    //validación de datos
    let errors = validationResult(req);

    if (errors.isEmpty()) {

        //Capturo al usuario a actualizar
        let userIdentity = req.user;
        let userToUpdate = req.body

        //Compruebo que los datos que son ingresados por el usuario no existan ya en la DB
        try {
            let userSearch = await User.find({
                '$or': [{email: userToUpdate.email}, {nick: userToUpdate.nick}]
            });
            
            //Flag
            let userAllreadyExist = false;

            userSearch.forEach((user) => {

                if (user._id != userIdentity.id) {
                    userAllreadyExist = true;
                };
            });

            if (userAllreadyExist) {
                
                return res.status(200).json({
                    status: 'Success',
                    message: 'Este email o nick ya estan registrados'
                });
            };
            
            // --> No hay datos duplicados <--

            //Cifrado de datos sensibles
            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;

            //Guardado en DB
            try {
                const USERSOTED = await User.findByIdAndUpdate(userIdentity.id, userToUpdate, {new : true});
                return res.status(200).json({
                    status: 'Success',
                    message: '¡Edición exitosa!',
                    user: USERSOTED
                });

            } catch (error) {
                return res.status(404).json({
                    status: 'Erorr',
                    message:'Error al editar usuario en DB',
                });
            };
            
        } catch (error) {
            return res.status(400).json({
                status: 'Error',
                message: 'Error al editar usuario',
            });
        };
        
    }else{
        return res.status(400).json({
            status: 'Error',
            message: errors.mapped()
        });
    };
};

//Eliminar usuario
const deleteUser = (req, res) => {

};

//Subida de Avatar
const upload = async (req, res) => {

    if (!req.file) {
        return res.status(404).json({
            status: 'Error',
            message: 'Debe cargar una imagen, extensiones permitidas: png, jpg, jpeg, gif'
        });
    };

    //Creo el nombre a la img
    const FILENAME = `user-avatar${Date.now()}${path.extname(req.file.originalname)}`;

    //Con sharp recupero imagen, redimensiono y guardo
    let file = await sharp(req.file.buffer).resize(400, 400).toFile(`${path.join(__dirname, '../uploads/avatars/')}${FILENAME}`);

    //Guardo img en DB

    try {
        const USERUPDATED = await User.findOneAndUpdate(req.user.id, {avatar: FILENAME}, {new: true});

        return res.status(200).json({
            status: 'Success',
            message: 'Avatar actualizado correctamente',
            user: USERUPDATED
        })

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Error al intentar actualizar fichero'
        });
    };
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
        const TOKEN = jwtMethod.createToken(USERTOLOGIN);
    
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
        const USER = await User.findById(req.params.id);
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
        });
    };
};

//Avatares
const avatars = async (req, res) => {

    //Nombre buscado 
    const IMGNAME = req.params.file;

    //Ruta absoluta img
    const ABSOLUTEPATH = `${path.join(__dirname, '../uploads/avatars/')}${IMGNAME}`;
   
    //Compruebo si el archivo existe
    
    if(fs.existsSync(ABSOLUTEPATH)){
        return res.sendFile(ABSOLUTEPATH);
    };

    return res.status(404).json({
        status:'Error',
        message: 'La imagen no existe'
    });

};

//Logout
const logout = (req, res) => {

};

module.exports = {allUsers, userById, createUser, editUser, deleteUser, upload, login, profile, avatars, logout};

