const { SlashCommandBuilder } = require("discord.js");
const autoRole = require('../../../models/autoRole');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription("You can enable or disable auto role here")
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("auto-role-new")
        .setDescription("auto role feature for new members!")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("enable-autorole-new")
            .setDescription(
              "Enable the auto role for any new member that joins"
            )
            .addRoleOption((role) =>
              role.setName("role").setDescription("Role you want to give!")
            )
        )
        .addSubcommand((subcommand)=> subcommand.setName('disable-autorole-new').setDescription('Disable auto role for new members'))
    ),

    run:async ({interaction,client,handler})=>{
        const subName = interaction.options.getSubcommand();
        const subGroup = interaction.options.getSubcommandGroup();
        const role = interaction.options.getRole('role');
        await interaction.deferReply({ ephemeral: true });
        const guildID = interaction.guild.id;
        if(subGroup==='auto-role-new'){
            if(subName==='enable-autorole-new'){
                //const role = interaction.options.get('role').value;
                console.log(role);
                const rolea = await autoRole.findOne({guildID : guildID});
                if(rolea){
                    if(rolea.roleID === role.id){
                        interaction.editReply('This role has already been set as the auto role! -_-');
                        return;
                    }
                    rolea.roleID = role.id;
                    interaction.editReply('Your role has been set as the autorole for new members!:3');
                    await rolea.save();
                    return;
                }
                else{
                    const newRole = new autoRole({
        
                        guildID : guildID,
                        roleID : role.id
                    })
                    interaction.editReply('Your autoRole has been enabled , configured and the role has been set as the autorole for new members!:3');
                    await newRole.save();
                    return;
                }
            }
            else{
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
            }
        }
    }
};
