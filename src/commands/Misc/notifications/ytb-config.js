const notif = require("../../../models/notif-config");
const {
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Parser = require("rss-parser");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-youtube-channel")
    .setDescription(
      "Add the youtube channel you want to post notifications of!"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel-id")
        .setDescription(
          "The channel ID in the server where u want the notifs to be posted"
        )
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("youtube-channel-id")
        .setDescription(
          "Add the youtube channel id that you want the notifications to be posted of"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("custom-message")
        .setDescription("The custom message. TEMPLATES : {VIDEO_LINK}  , {VIDEO_NAME} , {YOUTUBE_CHANNEL} , {CHANNEL_URL}")
    ),

  /**
   * @param {Object} param0
   * @param {ChatInputCommandInteraction} param0.interaction
   */
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });
    const channelID = interaction.options.getChannel("channel-id");
    const youtubeID = interaction.options.getString("youtube-channel-id");
    const customMsg = interaction.options.getString("custom-message");
    console.log(channelID);
    const notif1 = await notif.findOne({
      channelID: channelID.id,
      guildID: interaction.guild.id,
      youtubeChannelID: youtubeID,
    });
    //console.log(notif1);
    if (notif1) {
      interaction.editReply(
        "The channel has already been configured with this youtube channel! -_-"
      );
      return;
    }
    const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeID}`;
    const parser = new Parser();
    const feed = await parser.parseURL(YOUTUBE_RSS_URL);
    if (!feed) {
      interaction.editReply(
        `Please provide with a valid youtube channel ID smh...`
      );
      return;
    }

    const newNotif = new notif({
      guildID: interaction.guild.id,
      channelID: channelID.id,
      youtubeChannelID: youtubeID,
      lastChecked: new Date(),
      lastCheckedVideo: null,
      customMsg : customMsg
    });

    if (feed.items.length) {
      const lastVideo = feed.items[0];
      newNotif.lastCheckedVideo = {
        id: lastVideo.id.split(":")[2],
        publishdate: lastVideo.pubDate,
      };
    }
    const result = await newNotif.save();
    if (result) {
      const embed = new EmbedBuilder()
        .setTitle("CONGRATS!")
        .setDescription(
          "Your youtube channel registration for notifications was a success!!"
        );
      interaction.editReply({ embeds: [embed] });
      return;
    } else {
      const embed = new EmbedBuilder()
        .setTitle("OH NO!")
        .setDescription(
          "Your youtube channel registration for notifications failed..Please check that you entered the correct details smh.."
        );
      interaction.editReply({ embeds: [embed] });
      return;
    }
  },
};
