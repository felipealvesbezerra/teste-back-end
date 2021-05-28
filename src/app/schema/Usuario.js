const { Schema, model } = require('mongoose');

const Usuario = new Schema({
    primeiro_nome: {
        type: String,
        required: true
    },
    ultimo_nome: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        minLength: 11,
        maxLength: 11
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true,
        enum: ['F', 'M', 'O']
    },
    status: {
        type: Boolean,
        default: true
    }
});

Usuario.set('timestamps', true);

module.exports = model('Usuario', Usuario);