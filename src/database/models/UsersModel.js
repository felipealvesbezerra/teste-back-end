const bcrypt = require('bcrypt')

const mongoose = require('../config')
const { Schema, model } = mongoose

const UsersSchema = new Schema({
    firstName: {
        type: String,
        require: true,

    },
    lastName: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        unique: true,
        require: true
    },
    birthDate: {
        type: Date,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UsersSchema.pre('save', function (next) {
    const hash = bcrypt.hashSync(this.password, 10)
    this.password = hash
    next()
})

module.exports = model('Users', UsersSchema)