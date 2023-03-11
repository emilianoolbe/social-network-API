// --> Modelo + Validaciones<--
const Follow = require('../database/models/Follow');

//Todos los follows
const followAlls = (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Controlador follow'
    });
};

//Follow by ID

//Nuevo follow

//Eliminar follow

module.exports = {followAlls};