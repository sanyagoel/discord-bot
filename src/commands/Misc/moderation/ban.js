const { ApplicationCommandOptionType } = require("discord.js");
const { Client, IntentsBitField , ActivityType, PermissionFlagsBits } = require("discord.js");

module.exports = {

    data : {
        name : 'ban',
        description : 'You can ban this person if he is annoying you!',
        options : [
            {
                name : 'mentionuser',
                description:'Choose the id of the user',
                type : ApplicationCommandOptionType.Mentionable
            },

            {
                name :  'reason',
                description:'Give reason for banning the person :(',
                type : ApplicationCommandOptionType.String
            }
        ]
    },

    run : async({interaction,client,handler})=>{
        const targetUserId = interaction.options.get('mentionuser').value;
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        await interaction.deferReply({ ephemeral: true });
        const target = await interaction.guild.members.fetch(targetUserId);
        //console.log(target);
        if(!target){
            interaction.editReply(`${target.user.username} is not in the server -_-`);
            return;
        }

        if(target.id === interaction.guild.ownerId){
            interaction.editReply(`You cannot ban the owner smh.`);
            return;
        }

        const targetPosition = target.roles.highest.position;
        const userPosition = interaction.member.roles.highest.position;
        const botPosition = interaction.guild.members.me.roles.highest.position;
        if((targetPosition >= userPosition) && (interaction.member.id)!= (interaction.guild.ownerId)){
            interaction.editReply(`${target.user.username} cannot be banned by you, they have the same role or higher role than you! -_-`);
            return;
        }

        if(targetPosition >=botPosition){
            interaction.editReply(`${target.user.username} cannot be banned by me, they have the same role or higher role than me! -_-`);
            return;
        }
        
        try{
            await target.ban({reason});
            interaction.editReply(`${target.user.username} was banned haha! \n Reason : ${reason} `);
            return;
        }catch(err){
            interaction.editReply(`${target.user.username}was not banned due to some error from our side!<3`);
            console.log(err);
        }

    },

    options : {
        userPermissions :[PermissionFlagsBits.BanMembers],
        botPermissions : [PermissionFlagsBits.BanMembers]
    }
}