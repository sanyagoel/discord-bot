require('dotenv').config();

const {REST, Routes , ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

const commands = [
    {
        name : 'taylor-swift',
        description : 'Gives fact about taylor swift!'
    },
    {
        name : 'kanye-west',
        description : 'Roasts Kanye west :p'
    },

    {
        name : 'add-numbers',
        description : 'Add 2 numbers!',
        options : [
            {
                name : 'first-number',
                description : 'Your First Number',
                type: ApplicationCommandOptionType.Number,
                // choices : [
                //     {
                //         name : 'one',
                //         value : 1
                //     },

                //     {
                //         name : 'four',
                //         value : 4
                //     }
                // ]
            },

            {
                name : 'second-number',
                description : 'Your Second Number',
                type: ApplicationCommandOptionType.Number
            }
        ]
    },

    {
        name : 'our-websites',
        description : 'Choose Any Website To Explore! <3',
        options : [
            {
                name : 'choose-a-website',
                type : ApplicationCommandOptionType.String,
                description : 'This will give you information about our invoice-generator site! ',
                choices : [
                    {
                        name : 'invoice-gen',
                        value : 'invoice'
                    }
                ]
            }
        ]
    }

];


const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const fun = async function(){
    try{
        console.log('resgistering commands....')
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),{body : commands});
    }catch(err){
        console.log(err);
    }

}

fun();

// await rest.post(Routes.channelMessages(CHANNEL_ID), {
//     body: {
//         content: 'A message via REST!',
//     },
// });