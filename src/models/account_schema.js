const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const validateUserName = function(userName) {
    const regExp = /(^[0-9])|\W/
    return !regExp.test(userName)
};
const validatePassword = function(password) {
    const regExp = /[\t\n\r\f\v\s]/
    return !regExp.test(password)
};
const validateEmail = function(email) {
    const  regExp = /^([\w\-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\-]{2,3})$/
    return regExp.test(email)
};
const validateName = function(name) {
    const  regExp = /([0-9])|\W/
    return !regExp.test(name)
};


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Product title is required',
        minLength: 2,
        maxLength: 64
    },
    description: {
        type: String,
        required: 'Product description is required',
        maxLength: 512
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).']
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).']
    }
})

const AccountSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: '`This `{PATH}` fild is required',
        minLength: 4,
        maxLength: 16,
        unique: true,
        validate: [validateUserName, 'The value of path `{PATH}` ({VALUE}) must start with a letter and cannot contain special characters or blanks.']
    },
    password: {
        type: String,
        required: 'This `{PATH}` fild is required',
        minLength: 8,
        maxLength: 16,
        validate: [validatePassword, 'The value of path `{PATH}` ({VALUE}) cannot contain blank characters or spaces.'],
        select: false, 
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'This `{PATH}` fild is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        required: 'This `{PATH}` fild is required',
        minLength: 2,
        maxLength: 32
    },
    lastName: {
        type: String,
        required: 'This `{PATH}` fild is required',
        minLength: 2,
        maxLength: 32
    },
    birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'], 
        required: true 
    },
    cart: [ProductSchema],
    balance: {
        type: Number,
        min: [0, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'],
        default: 0.00
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    },

})

AccountSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next();
})

const Account = mongoose.model('AccountsTable', AccountSchema, "accounts")
module.exports = Account