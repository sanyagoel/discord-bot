const { SlashCommandBuilder , ChatInputCommandInteraction, PermissionFlagsBits} = require("discord.js");

const notif = require("../../../models/notif-config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-youtube-channel")
    .setDescription(
      "If you want to stop notifications from a particular youtube channel"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel from the server where notifs are coming").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("youtubechannelid")
        .setDescription("The Id of the youtube channel you wanna stop").setRequired(true)
    ),

  /**
   * @param {Object} param0
   * @param {ChatInputCommandInteraction} param0.interaction
   */
    run : async ({interaction, client, handler})=>{
       try{
        await interaction.deferReply({ephemeral : true});
        const channelID = interaction.options.getChannel('channel');
        const youtubeID = interaction.options.getString('youtubechannelid');

        const notif1 = await notif.findOne({guildID : interaction.guild.id , channelID : channelID.id , youtubeChannelID : youtubeID});
        if(!notif1){
            interaction.editReply('Sorry there is no such youtube channel configured for this channel.');
            return;
        }

        const result = await notif.deleteOne({guildID : interaction.guild.id , channelID : channelID.id , youtubeChannelID : youtubeID});
        if(result){
            interaction.editReply('Notifications for that youtube channel has been turned off for the given server channel ! :)');
            return;
        }
        else{
            interaction.editReply(`Some problem has occured from our side, please have patience!`);
            return;
        }
       }catch(err){
        console.log(err);
       }
    }
};
