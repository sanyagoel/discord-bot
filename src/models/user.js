const mongoose = require('mongoose');

const userSystem = mongoose.Schema({

    userID : {
        type : String,
        required : true
    },

    serverID : {
        type : String,
        required : true
    },

    balance : {
        type : Number
    },

    lastDaily : {
        type : Date
    }

})

module.exports = mongoose.model('User',userSystem);