const mongoose = require('mongoose');

const notif = mongoose.Schema({

    guildID : {
        type : String,
        required : true
    },

    channelID : {
        type : String,
        required : true
    },

    youtubeChannelID : {
        type : String,
        required : true
    },

    lastChecked : {
        type : Date,
        required : true
    },

    lastCheckedVideo : {
        type : {
            id : {
                type : String,
            },
            publishdate : {
                type : Date

            }
        }
    },

    customMsg : {
        type : String
    }

}, {timestamps : true})


module.exports = mongoose.model('Notif',notif);