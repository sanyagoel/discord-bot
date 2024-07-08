const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    data : {
        name : 'add-numbers',
        description : 'You can add 2 numbers here! <3',
        options : [
            {
                name : 'first-number',
                description : 'Your first number',
                type : ApplicationCommandOptionType.Number
            },
            {
                name: 'second-number',
                description : 'Your second Number',
                type : ApplicationCommandOptionType.Number
            }
        ]
    },

    run : async ({interaction , client , handler})=>{
        await interaction.deferReply();
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        const ans = num1 + num2;
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        if(ans==8){
            interaction.editReply(`YOU LITERALLY ATE!! , timestamp is ${ping} , timestamp : ${client.ws.ping}`);
        }
        else{
            interaction.editReply(`Your answer is ${ans} !!<3,  timestamp is ${ping} , timestamp : ${client.ws.ping}`);
        }
    }
}