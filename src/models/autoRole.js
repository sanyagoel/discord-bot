const mongoose = require('mongoose');

const autoRole = mongoose.Schema({

    guildID : {
        type : String,
        required : true
    },

    roleID : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('autoRole',autoRole);