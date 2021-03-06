const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    }
}));

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer=Customer;
module.exports.validate=validateCustomer;