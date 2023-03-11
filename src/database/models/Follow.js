const {Schema, model} = require('mongoose');

//Defino el Schema de la colección.
const FollowSchema = Schema({
    user: {
        type: String,
        required: true
    },
    followed: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Follow', FollowSchema, 'follow');