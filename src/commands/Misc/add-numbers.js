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

    run : ({interaction , client , handler})=>{
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        const ans = num1 + num2;
        if(ans==8){
            interaction.reply(`YOU LITERALLY ATE!!`);
        }
        else{
            interaction.reply(`Your answer is ${ans} !!<3`);
        }
    }
}