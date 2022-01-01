const { Schema, model } = require('mongoose');

// Usuario.js fue creado con mayuscula por que es una clase/class

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UserSchema);
