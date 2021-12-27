const { Schema, model } = require('mongoose');

// Usuario.js fue creado con mayuscula por que es una clase/class

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = model('Usuario', UserSchema);
