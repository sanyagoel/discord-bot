const mongoose = require('mongoose');

const levelxp = mongoose.Schema({

    userID :{
        type : String,
        required : true
    },

    guildID : {
        type : String,
        required : true
    },

    xp : {
        type : Number,
        required : true
    },

    level : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Level',levelxp);
