const { PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');
const autoRole = require('../../../models/autoRole');

module.exports = {

    data : {

        name : 'autorole-enable',
        description : 'Permission to automatically give this role to anyone new who joins in',
        options : [
            {
                name : 'role',
                description : 'Role that you want to auto assign',
                type : ApplicationCommandOptionType.Role
            }
        ]
    }
    ,
    run : async ({interaction,client,handler})=>{
        try{
            await interaction.deferReply({ ephemeral: true });
            const guildID = interaction.guild.id;
            const role = interaction.options.get('role').value;
            console.log(role);
            const rolea = await autoRole.findOne({guildID : guildID});
            if(rolea){
                if(rolea.roleID === role){
                    interaction.editReply('This role has already been set as the auto role! -_-');
                    return;
                }
    
                rolea.roleID = role;
                interaction.editReply('Your role has been set as the autorole for new members!:3');
                await rolea.save();
                return;
            }
            else{
                const newRole = new autoRole({
    
                    guildID : guildID,
                    roleID : role
                })
                interaction.editReply('Your autoRole has been enabled , configured and the role has been set as the autorole for new members!:3');
                await newRole.save();
                return;
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