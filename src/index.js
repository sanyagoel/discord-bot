require("dotenv").config();

const { EmbedBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField , ActivityType } = require("discord.js");
const { CommandKit } = require('commandkit');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  eventsPath : `${__dirname}/events`,
  devGuildIds : ['1259027243292954666'],
  commandsPath : `${__dirname}/commands`,
  bulkRegister: true,
  devUserIds : ['980061187851034625'],
  devRoleIds : ['1259096088263004220']
  //skipBuiltInValidations : true
});




//console.log(process.env.BOT_TOKEN);

client.login(process.env.BOT_TOKEN);
