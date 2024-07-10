const { ApplicationCommandOptionType , EmbedBuilder} = require("discord.js");
const User = require('../../../models/user');
module.exports = {

    data : {
        name :'check-balance',
        description : 'Check your balance or anyone elses balance in the server xD',
        options : [
            {
                name : 'person',
                description : 'Person whos balance you wanna stalk!;)',
                type : ApplicationCommandOptionType.Mentionable
            }
        ]
    },

    run : async ({interaction,client,handler})=>{
       try{
        await interaction.deferReply({ ephemeral: true });
        const userID = interaction.options.get('person')?.value || interaction.member.id;
        const guildID = interaction.guild.id;
        const target = await interaction.guild.members.fetch(userID);
        console.log(target);
        if(!interaction.inGuild()){
            interaction.reply('You can only run this command in a server!');
            return;
        }
        if(!target){
            interaction.editReply('User is not in the server...');
            return;
        }
        const user = await User.findOne({userID : userID , serverID : guildID});
        if(!user){
            interaction.editReply(`${target.user.username} has not texted enough to enter the levelling system, so their balance is 0`);
            return;
        }
        const embed = new EmbedBuilder().setTitle(`Balance Info For ${target.user.username}`).addFields({name : 'Balance : ', value : `${user.balance} sanbucks`}).setImage('https://i.pinimg.com/564x/16/29/a8/1629a8383efc3c44caee6de9dbfc9090.jpg').setThumbnail('https://i.pinimg.com/736x/db/87/37/db873771f02cd0900d0f373cc63949a9.jpg').setColor('LuminousVividPink').setFooter({text : 'Do not get jealous! xD'});
        interaction.editReply({embeds : [embed]});

       }catch(err){
        console.log(err);
       }
    }
}