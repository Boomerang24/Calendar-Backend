const { Schema, model } = require('mongoose');

// Usuario.js fue creado con mayuscula por que es una clase/class

const EventoSchema = Schema({

    title:{
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

/* Funciona para modificar como se regresa la informacion */
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject(); // con esto tenemos referencia al objeto serializado "EventoSchema"
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);
