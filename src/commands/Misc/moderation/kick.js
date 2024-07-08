const { ApplicationCommandOptionType , PermissionFlagsBits} = require("discord.js");

module.exports = {

    data : {
        name : 'kickperson',
        description : 'You can kick a person :)',
        options : [
            {
                name : 'person',
                description : 'Select the person whom u want to kick',
                type : ApplicationCommandOptionType.Mentionable
            }, {
                name : 'reason',
                description : 'Give reason for the kick',
                type : ApplicationCommandOptionType.String
            }
        ]
    },

    run : async({interaction,client})=>{
        await interaction.deferReply();
        const targetUserId = interaction.options.get('person').value;
        const reason = interaction.options.get('reason')?.value || 'No Reason Provided';
        
        const target = await interaction.guild.members.fetch(targetUserId);
        console.log(target.user.username);
        if(!target){
            interaction.editReply(`${target.user.username} is not in the server -_-`);
            return;
        }

        if(target.id === interaction.guild.ownerId){
            interaction.editReply(`You cannot kick the owner smh.`);
            return;
        }

        const targetPosition = target.roles.highest.position;
        const userPosition = interaction.member.roles.highest.position;
        const botPosition = interaction.guild.members.me.roles.highest.position;
        if((targetPosition >= userPosition) && (interaction.member.id)!= (interaction.guild.ownerId)){
            interaction.editReply(`${target.user.username} cannot be kicked by you, they have the same role or higher role than you! -_-`);
            return;
        }

        if(targetPosition >=botPosition){
            interaction.editReply(`${target.user.username} cannot be kicked by me, they have the same role or higher role than me! -_-`);
            return;
        }
        try{
            await target.kick({reason});
            interaction.editReply(`${target.user.username} was kicked haha! \n Reason : ${reason} `);
            return;
        }catch(err){
            interaction.editReply(`${target.user.username}was not kicked due to some error from our side!<3`);
            console.log(err);
        }
    },
    options : {
        userPermissions :[PermissionFlagsBits.KickMembers],
        botPermissions : [PermissionFlagsBits.KickMembers]
    }
}