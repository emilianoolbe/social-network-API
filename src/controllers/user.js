// --> Modelo <--
const User = require('../database/models/User');

// --> Métodos <--

//Todos los usuarios
const allUsers = (req, res) => {

};

//Usuario por ID
const userById = (req, res) => {

};

//Crear usuario
const createUser = (req, res) => {
    //validación de datos

    //Control de usuarios duplicados

    //Cifrado de datos sensibles

    //Guardar usuario en DB - retorno de resultados
};

//Editar usuario
const editUser = (req, res) => {

};

//Eliminar usuario
const deleteUser = (req, res) => {

};

//Login
const login = (req, res) => {

};

//Logout
const logout = (req, res) => {

};

module.exports = {allUsers, userById, createUser, editUser, deleteUser, login, logout};

