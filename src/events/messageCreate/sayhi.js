module.exports = (message, client,handler) => {
    if(message.author.bot){
      return;
    }
    if (message.content === 'hey') {
         message.reply('hey');
      }
      else if(message.content==='ping'){
        message.reply('PONG :)');
      }

  };