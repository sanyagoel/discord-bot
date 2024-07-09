const { PermissionFlagsBits } = require('discord.js');
const autoRole = require('../../../models/autoRole');

module.exports = {

    data : {
        name : 'autorole-disable',
        description : 'If you no longer want automatically roles to be given to new members! :('
    },

    run :async  ({interaction,client,handler})=>{
      try{
        await interaction.deferReply({ ephemeral: true });
        const guildID = interaction.guild.id;
        const role = await autoRole.findOne({guildID : guildID});
        if(!role){
            interaction.editReply('It is already disabled. Please learn to read');
            return;
        }

        else{
            const result = await autoRole.deleteOne({guildID : guildID});
            if(result){
                interaction.editReply('Congrats auto role is disabled.');
                return;
            }
            else{
                interaction.editReply('There was a problem disabling it , from our side, please have patience :((');
                return;
            }
        }
      }catch(err){
        console.log(err);
      }

    }

    ,
    permissions : [
        userPermissions = [PermissionFlagsBits.Administrator],
        botPermissions = [PermissionFlagsBits.ManageRoles]
    ]
}