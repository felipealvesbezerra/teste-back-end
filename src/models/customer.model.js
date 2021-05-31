const mongoose = require('mongoose');
const { MessagesValidators } = require('../utils/messageValidator.validator')

const CustomerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true,MessagesValidators.NullOrVoid],
        uppercase: true,
        minlength: 3,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: [true,MessagesValidators.NullOrVoid],
        uppercase: true,
        minlength: 3,
        maxlength: 100
    },
    age: {
        type: Number,
        required: [true,MessagesValidators.NullOrVoid],
        min: 1,
        max: 999,
        
    },
    email: {
        type: String,
        required: [true,MessagesValidators.NullOrVoid],
    },
    phone: {
        type: Number,
        min: 1,
        max: 99999999999,
      
    },
    address: {
        type:{
            city: {
                type: String,
                required: [true,MessagesValidators.NullOrVoid],
                minlength: 3,
                maxlength: 100
            },
            state: {
                type: String,
                required: [true,MessagesValidators.NullOrVoid],
                minlength: 2,
                maxlength: 2
            },
            district: {
                type: String,
                required: [true,MessagesValidators.NullOrVoid],
                minlength: 2,
                maxlength: 999999,
            },
            number: {
                type: Number,
                required: [true,MessagesValidators.NullOrVoid],
                min: 1,
                max: 999,
                unique: true
            },
            zipcode: {
                type: Number,
                required: [true,MessagesValidators.NullOrVoid],
                min: 1,
                max: 99999999,
                unique: true
            },
            
        },
        required: true
    },

},{timestamps:true});


module.exports = mongoose.model('Customer', CustomerSchema);