//Importo Mongoose
const mongoose = require('mongoose');

//Función asincrona a la db
const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialNetwork');
        console.log('Conexión existosa a la db: socialNetwork');
    } catch (error) {
        throw new Error('Error al conectar a la db:socialNetwork')
    }
};

module.exports = connection;
