const { get } = require('mongoose');
const level = require('../../models/levelSystem');
const { userMention, EmbedBuilder } = require('discord.js');

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const cooldown = new Set();

module.exports = async (message,client,handler)=>{
   try{
    //console.log(cooldown);
    if(message.author.bot || cooldown.has(message.author.id)){
        return;
    }
    const target = await message.guild.members.fetch(message.author.id);
    //console.log(target.roles.cache);
    //console.log('hiiii',message.author);
    const query = {
        userID : message.author.id,
        guildID: message.guild.id
    }
    const user = await level.findOne(query);
    if(!user){
        const newUser = new level({
            userID : message.author.id,
            guildID : message.guild.id,
            xp : 0,
            level : 1
        })
        const embed = new EmbedBuilder().setColor('LuminousVividPink').setTitle('Congrats for entering the levelling system!').addFields({name : 'DISCLAIMER', value : 'Do NOT try to spam messages, as your xp will only be updated every 60 seconds, so no use of spamming in chat!:3'}).setFooter({text : 'Have a nice day<3 BBYE!'})
        await newUser.save();
        message.channel.send({embeds : [embed]});
        return;
    }

    const xp = getRandomXp(8,15);
    user.xp += xp;
    if(user.xp > (user.level)*100){
        const newLevel = user.level + 1;
       await message.channel.send(`CONGRATS ${message.author.username}, YOU HAVE UPGRADED FROM LEVEL ${user.level} to ${newLevel} <3`);
       user.xp = user.xp - ((user.level)*100);
       if(user.xp < 0){
        user.xp = 0;
       }
        user.level = user.level + 1;
        await user.save();
        cooldown.add(message.author.id);
        setTimeout(()=>{
            cooldown.delete(message.author.id);
        },60000);
        if(newLevel >= 10){
          await  target.roles.add('1259923736593825802');
        }
        return;
    }
    cooldown.add(message.author.id);
    setTimeout(()=>{
        cooldown.delete(message.author.id);
    },60000);
    await user.save();
   }catch(err){
    console.log(err);
   }
}
