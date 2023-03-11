// --> Modelo <--
const Publication = require('../database/models/Publication');

// --> Métodos <--

//Todas las publicaciones
const allPublications = (req, res) => {
    
    res.status(200).json({
        status: 'Success',
        message: 'Controlador publicaciones'
    })
};

//Publicación por ID
const publicationById = (req, res) => {

};

//Nueva publicaión
const publicationCreate = (req, res) => {
    //validación de datos

    //Control de usuarios duplicados

    //Cifrado de datos sensibles

    //Guardar usuario en DB - retorno de resultados
};

//Editar publicación
const publicationEdit = (req, res) => {

};

//Eliminar publicación
const publicationDelete = (req, res) => {

};


module.exports = {allPublications, publicationById, publicationCreate, publicationEdit, publicationDelete};

