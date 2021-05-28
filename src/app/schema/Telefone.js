const { Schema, model } = require('mongoose');

const Telefone = new Schema({
    ddd: {
        type: Number,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    whatsapp: {
        type: Boolean,
        default: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

Telefone.set('timestamps', true);

module.exports = model('Telefone', Telefone);