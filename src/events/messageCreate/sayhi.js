const User = require('../../models/user');

module.exports = async (message, client,handler) => {
    if(message.author.bot){
      return;
    }
    if (message.content === 'hey') {
         message.reply('hey');
      }
      else if(message.content==='ping'){
        message.reply('PONG :)');
      }
      else if(message.content ==='balance'){
        console.log(message.author.id);
        console.log(message.guild.id);
        const userID = message.author.id;
        const guildID = message.guild.id;
        const user = await User.findOne({userID : userID , serverID : guildID});
        console.log(user);
        message.channel.send(`Your Balance Is : ${user.balance} sanbucks !! :)`);

      } 

  };