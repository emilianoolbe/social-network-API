const {Schema, model} = require('mongoose');

//Defino el Schema de la colección.
const PublicationSchema = Schema({
    text: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Publication', PublicationSchema, 'publication');