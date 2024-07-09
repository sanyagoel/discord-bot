require("dotenv").config();

const { EmbedBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField , ActivityType, PermissionFlagsBits } = require("discord.js");
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences
  ],
});



const mongoose2 = async ()=>{
  try{
   await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected :)');
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
    client.login(process.env.BOT_TOKEN);
  }catch(err){
    console.log(err);
  }
}

mongoose2();

//console.log(process.env.BOT_TOKEN);




