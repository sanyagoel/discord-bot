const {EmbedBuilder} = require('discord.js');
const User = require('../../../models/user');
const ms = require('ms');
module.exports = {
    data : {
        name : 'daily',
        description : 'Gives A Daily Balance of 1000 sanbucks'
    },

    run : async ({interaction,client,handler})=>{
        try{
            await interaction.deferReply();
            if(!interaction.inGuild()){
                interaction.reply('You can only run this in a server');
                return;
            }
            const userID = interaction.member.id;
            const serverID = interaction.guild.id;
            const query = {
                userID : userID,
                serverID : serverID
            }
            
            const user = await User.findOne(query);
            if(!user || (user && (user.balance==0))){
                const newUser = new User({
                    userID : userID,
                    serverID : serverID,
                    balance : 1000,
                    lastDaily : new Date()
                })
                await newUser.save();
                const embed = new EmbedBuilder().setTitle('Hi, thanks for opening an account in the sanbank!').addFields({name : 'IMPORTANT', value : ' Log in daily with the /daily command to get 1000 sanbucks a day!'}).setColor('Blurple').setImage('https://i.pinimg.com/564x/f7/0e/1f/f70e1f31c162bafd91fd3a14059ea7bf.jpg').setFooter({text : 'bbyee! '});
                interaction.editReply({embeds : [embed]});
                return;
            }
            const currentTime = new Date();
            console.log('currentTime' , currentTime);
            const diffTime = Math.abs(currentTime - user.lastDaily);
            console.log('diffTime', diffTime);
            const hours = (diffTime)/(1000*60*60);
            console.log('hours',hours);
            const timeLeft = 24 - hours;
            const msDuration = ms(`${timeLeft}h`);
            const finalTime = ms(msDuration , {long : true});
            if(hours<24){
                interaction.editReply(`Sorry, 24 hours have not been completed yet. Come back after ${finalTime}!`)
                return;
            }
             user.balance += 1000;
             user.lastDaily = new Date();
             await user.save();
            

             interaction.editReply('+1000 has been added into your account. /balance to check your total balance :3');
             return;
        }catch(err){
            console.log(err);
        }
    }
}