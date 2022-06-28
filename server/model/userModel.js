"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    address: {
        type: String,
        required: true,
    },
    refaddress: {
        type: String,
    },
    date: {
        type: Date,
        default: () => new Date()
    }

})

const userModel = mongoose.model('user', schema);

module.exports = userModel;