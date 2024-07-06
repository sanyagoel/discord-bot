require("dotenv").config();

const { EmbedBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online! :3`);
});

client.on("messageCreate", (message) => {
 // console.log(message);
  if (message.author.bot) {
    return;
  }
  if(message.content==='kanye west'){
    message.reply("he is a bald useless piece of shit");
  }
  if (message.content === "hello") {
    message.reply("hello");
  }
  if (message.content === "ping") {
    message.reply("PONG!");
  }
  if (message.content === "invoicewebsite") {
    const embed = new EmbedBuilder()
      .setTitle("INVOICE GENERATOR :)")
      .setDescription(
        "This is a beautiful website for invoice generating, and keeping track of your clients! :)"
      )
      .setColor([252, 225, 228])
      .setTimestamp()
      .setFooter({ text: `Bbye ${message.author.tag} !!! :)` })
      .addFields(
        {
          name: "1.",
          value: "Automatically sends invoice to your client! \n\n\n",
        },
        {
          name: "2.",
          value:
            "View your clients, and download invoice of any client you want! \n\n\n",
        },
        {
          name: "3.",
          value:
            "Delete Clients and secure protection against csrf attacks! \n\n\n",
        }
      )
      .setImage(
        "https://i.pinimg.com/736x/d8/0b/0e/d80b0ea710366ab49f997466afc27875.jpg"
      )
      .setThumbnail(
        "https://i.pinimg.com/736x/db/87/37/db873771f02cd0900d0f373cc63949a9.jpg"
      )
      .setURL("https://invoice-generator-1-51kz.onrender.com");
    message.channel.send({ embeds: [embed] });
  }
});

const positiveAdjectives = [
  "affectionate",
  "agreeable",
  "amiable",
  "bright",
  "charming",
  "creative",
  "determined",
  "diligent",
  "diplomatic",
  "dynamic",
  "energetic",
  "friendly",
  "funny",
  "generous",
  "giving",
  "gregarious",
  "hardworking",
  "helpful",
  "kind",
  "likable",
  "loyal",
  "patient",
  "polite",
  "sincere",
  "amazing",
  "awesome",
  "blithesome",
  "excellent",
  "fabulous",
  "favorable",
  "fortuitous",
  "gorgeous",
  "incredible",
  "unique",
  "mirthful",
  "outstanding",
  "perfect",
  "philosophical",
  "propitious",
  "remarkable",
  "rousing",
  "spectacular",
  "splendid",
  "stellar",
  "stupendous",
  "super",
  "upbeat",
  "stunning",
  "wondrous",
];

client.on("interactionCreate", async (interaction) => {
 try{

    // if(!interaction.isChatInputCommand) return;
    if (interaction.commandName === "taylor-swift") {
      let index = Math.floor(Math.random() * 50);
      console.log(index);
      const word = positiveAdjectives[index];
      console.log(word);
      interaction.reply(`Taylor Swift is ${word}!! :D`);
    } else if (interaction.commandName === "add-numbers") {
      const num1 = interaction.options.get("first-number").value;
      const num2 = interaction.options.get("second-number").value;
      const ans = num1 + num2;
      if (ans == 8) {
        return interaction.reply(`YOU LITERALLY 8 :P`);
      }
      interaction.reply(`The answer is ${ans}`);
    } else if (interaction.commandName === "our-websites") {
      const website = interaction.options.get("choose-a-website").value;
      if (website === "invoice") {
        const embed = new EmbedBuilder()
          .setTitle("INVOICE GENERATOR :)")
          .setDescription(
            "This is a beautiful website for invoice generating, and keeping track of your clients! :)"
          )
          .setColor([252, 225, 228])
          .setTimestamp()
          .setFooter({ text: `Bbye ${interaction.user.tag} !!! :)` })
          .addFields(
            {
              name: "1.",
              value: "Automatically sends invoice to your client! \n\n\n",
            },
            {
              name: "2.",
              value:
                "View your clients, and download invoice of any client you want! \n\n\n",
            },
            {
              name: "3.",
              value:
                "Delete Clients and secure protection against csrf attacks! \n\n\n",
            }
          )
          .setImage(
            "https://i.pinimg.com/736x/d8/0b/0e/d80b0ea710366ab49f997466afc27875.jpg"
          )
          .setThumbnail(
            "https://i.pinimg.com/736x/db/87/37/db873771f02cd0900d0f373cc63949a9.jpg"
          )
          .setURL("https://invoice-generator-1-51kz.onrender.com");
        interaction.reply({ embeds: [embed] });
      }
      console.log(website);
    }
    else if(interaction.isButton()){
        console.log(interaction.customId);
        await interaction.deferReply({ephemeral: true});
      const role = interaction.guild.roles.cache.get(interaction.customId);
      //console.log(role);
      if(!role){
          interaction.editReply({
              content : 'Could not find that role! :('
          })
          return;
      }
  
      hasRole = interaction.member.roles.cache.has(role.id);
      //console.log(hasRole);
      if(hasRole){
          await interaction.member.roles.remove(role.id);
          interaction.editReply({
              content : `${role} removed!`
          })
          return;
      }
  
      await interaction.member.roles.add(role);
      interaction.editReply({
          content : `${role} has been added! :)`
      })
      return;
    }
  
 }catch(err){
    console.log(err);
 }
});

//console.log(process.env.BOT_TOKEN);

client.login(process.env.BOT_TOKEN);
