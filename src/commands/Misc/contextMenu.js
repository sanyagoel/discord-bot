require('dotenv').config();
const {ContextMenuCommandBuilder, ApplicationCommandType} = require('discord.js');
const { translate } = require('bing-translate-api');

// async function loadTranslateModule() {
//     try {
//       const translate = await import('translate');
//       // You can use translate module here
//     } catch (err) {
//       console.error('Failed to import translate module:', err);
//     }
//   }
  
//   // Call the async function to load the module
//   loadTranslateModule();
  

// translate.engine = 'Yandex';
// translate.key = process.env.translateKEY;

module.exports ={

    data :  new ContextMenuCommandBuilder().setName('translator').setType(ApplicationCommandType.Message),

    run : async ({interaction,client,handler})=>{
        await interaction.deferReply();
        const targetMessage = interaction.targetMessage;
        console.log(targetMessage.content);
        // const updatedMessage = await translate(targetMessage,'eng');
        const updatedMessage = await translate(targetMessage.content, null, 'en');
        console.log(updatedMessage);
        interaction.editReply(`Translation : ${updatedMessage.translation}`);
        return;
    }
}
