const {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder, ActionRowBuilder,
  ButtonStyle
} = require("discord.js");

const { ButtonKit } = require("commandkit");

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
      // const targetUser = interaction.options.
      const targetUser = interaction.options.getUser('friend');
      //console.log(targetUser);
      const embed = new EmbedBuilder().setTitle(`${interaction.member.user.username} is inviting ${targetUser.username} to play a game of rock paper scissors!`).setColor('Blurple');
       const buttonsList = [];
      choices.forEach((choice)=>{
        button = new ButtonKit().setCustomId(choice.name).setLabel(choice.name).setEmoji(choice.emoji).setStyle(ButtonStyle.Primary);
        buttonsList.push(button);
      })

      const buttonRow = new ActionRowBuilder().addComponents(buttonsList);

      const message = await interaction.editReply({ embeds: [embed] , components : [buttonRow]});

      const targetuserInteraction = await message.awaitMessageComponent({
            time : 15_000
        }).catch((err)=>{
            embed.setDescription('The dumb user did not reply in time..sorry..')
            message.edit({embeds : [embed] , components : []});
        })

        console.log(targetuserInteraction);
        if(!targetuserInteraction){
            return;
        }

      buttonRow.components.forEach((button)=>{
        button.onClick(
           async  (interaction) => {
            await interaction.deferReply();
                console.log(interaction.customId);
                interaction.editReply('You clicked the button!');
            },
            { message },
        );
      })
        
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
        required : true
      },
    ],
  },
};
