const {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonInteraction,
  ButtonBuilder,
} = require("discord.js");

const choices = [
  { name: "Rock", emoji: "🪨", beats: "Scissors" },
  { name: "Paper", emoji: "📃", beats: "Rock" },
  { name: "Scissors", emoji: "✂️", beats: "Paper" },
];

module.exports = {
  /**
   * @param {Object} param0
   * @param {ChatInputCommandInteraction} param0.interaction
   */
  run: async ({ interaction, client, handler }) => {
    try {
      await interaction.deferReply();
      const targetUser = interaction.options.getUser("friend");
      const user2 = interaction.member.id;
      const user = await interaction.guild.members.fetch(user2);
      const rounds = interaction.options.get("rounds").value;

      let scoreUser = 0;
      let scoretargetUser = 0;
      let currentuserChoice;
      let currenttargetUserChoice;

      const embed = new EmbedBuilder()
        .setTitle(
          `${interaction.member.user.username} is inviting ${targetUser.username} to play a game of rock paper scissors!`
        ).setDescription(`\n ${targetUser} pick a choice to start the game!:3`)
        .setColor("Blurple");

      const buttonsList = choices.map((choice) =>
        new ButtonBuilder()
          .setCustomId(choice.name)
          .setLabel(choice.name)
          .setStyle(ButtonStyle.Primary)
          .setEmoji(choice.emoji)
      );

      const buttonRow = new ActionRowBuilder().addComponents(buttonsList);

      for (let i = 0; i < rounds; i++) {
        await interaction.editReply({
          embeds: [embed],
          components: [buttonRow],
        });

        const targetUserInteraction = await interaction.channel
          .awaitMessageComponent({
            filter: (i) => i.user.id === targetUser.id,
            time: 30_000,
          })
          .catch(async (error) => {
            embed.setDescription(`Game over. ${targetUser} did not respond in time.`);
            await interaction.editReply({ embeds: [embed], components: [] });
            return null;
          });

        if (!targetUserInteraction) return;

        currenttargetUserChoice = targetUserInteraction.customId;
        embed.setDescription(`It is ${user.user}'s turn!`);
        await targetUserInteraction.update({ embeds: [embed], components: [buttonRow] });

        const UserInteraction = await interaction.channel
          .awaitMessageComponent({
            filter: (i) => i.user.id === interaction.member.id,
            time: 30_000,
          })
          .catch(async (error) => {
            embed.setDescription(`Game over. ${user.user} did not respond in time.`);
            await interaction.editReply({ embeds: [embed], components: [] });
            return null;
          });

        if (!UserInteraction) return;

        currentuserChoice = UserInteraction.customId;
        embed.setDescription(`Calculating points for this round...`);
        await UserInteraction.update({ embeds: [embed], components: [buttonRow] });

        if (currentuserChoice === currenttargetUserChoice) {
          embed.setDescription(`Both threw ${currentuserChoice}, no change in points! \n Next Round starting with ${targetUser}'s turn!`);
          interaction.editReply({ embeds: [embed], components: [buttonRow] });

        } else {
          choices.forEach((choice) => {
            if (
              currentuserChoice === choice.name &&
              currenttargetUserChoice === choice.beats
            ) {
              scoreUser += 1;
              embed.setDescription(
                `${user.user.username} won this round! :P \n Current Score : \n ${user.user} : ${scoreUser} \n ${targetUser} : ${scoretargetUser} \n Next Round starting with ${targetUser}'s turn!`
              );
              interaction.editReply({ embeds: [embed], components: [buttonRow] });

            } else if (
              currenttargetUserChoice === choice.name &&
              currentuserChoice === choice.beats
            ) {
              scoretargetUser += 1;
              embed.setDescription(
                `${targetUser.username} won this round! :P \n Current Score : \n ${user.user} : ${scoreUser} \n ${targetUser} : ${scoretargetUser} \n Next Round starting with ${targetUser}'s turn!`
              );
              
              interaction.editReply({ embeds: [embed], components: [buttonRow] });

            }
          });
        }

        // await UserInteraction.update({ embeds: [embed], components: [buttonRow] });
      }

      if (scoreUser > scoretargetUser) {
        embed.setDescription(`${user.user} won the game!! CONGRATS!`);
      } else if (scoreUser === scoretargetUser) {
        embed.setDescription(`${user.user} and ${targetUser} it's a tie!! CONGRATS!`);
      } else {
        embed.setDescription(`${targetUser} won the game!! CONGRATS!`);
      }

      await interaction.editReply({ embeds: [embed], components: [] });

    } catch (err) {
      console.log(err);
    }
  },
  data: {
    name: "rockps",
    description: "Play rock paper scissors with your friend!",
    options: [
      {
        name: "friend",
        description: "Choose the friend whom you want to play with",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "rounds",
        description: "Choose the number of rounds you wanna play!",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
};
