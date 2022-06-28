"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    address: {
        type: String,
        required: true,
    },
    txHash: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    }

})

const vipUserModel = mongoose.model('vipuser', schema);

module.exports = vipUserModel;