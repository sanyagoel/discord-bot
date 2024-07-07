module.exports = (message, client,handler) => {
    if (message.content === 'hey') {
         message.reply('Hi!');
      }
      else if(message.content==='ping'){
        message.reply('PONG :)');
      }
  };