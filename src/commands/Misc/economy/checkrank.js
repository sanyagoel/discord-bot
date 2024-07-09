const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const level = require('../../../models/levelSystem');


module.exports = {
  data: {
    name: "checklevelandrank",
    description: "Come see info about ur level or someone else's level",
    options: [
      {
        name: "friend",
        description: "check your friend's rank or level in the server!",
        type: ApplicationCommandOptionType.Mentionable
      }
    ],
  },

  run :async ({interaction,client,handler})=>{
try{
    await interaction.deferReply();
    const userID = interaction.options.get('friend')?.value || interaction.member.id;
    //console.log(userID);
    //console.log(interaction.member.id);
   // console.log(interaction.guild.id);
    let userLevel;
    // if(ans==='level'){
    //     const userID = interaction.member.id;
    //     const user = await level.findOne({userID : userID , guildID : interaction.guild.id});
    //     //console.log(user);
    //     interaction.reply(`Hi, your level is ${user.level} !:)`);
    //     userLevel = user.level;
    //     return;
    // }
        // const userID = interaction.member.id;

        const target = await interaction.guild.members.fetch(userID);
        //console.log(target);
        if(!target){
            interaction.editReply(`${target.user.username} does not exist in the server! -_-`);
            return;
        }

         const user = await level.findOne({userID : userID, guildID : interaction.guild.id});
         if(!user){
            interaction.editReply(`Sorry that user does not exist in the levels system, encourage them to chat more to enter :3`);
            return;
         }

         userLevel = user.level;
         const levels = await level.find({guildID : interaction.guild.id}).select('level userID -_id');
        // //console.log(levels);
        let rank=1;


         levels.map((le)=>{
             if((le.level > userLevel)){rank = rank+ 1 ;}});
         //console.log(rank);



         const { Font, RankCardBuilder } = require('canvacord');
         //Font.loadDefault();
         Font.fromFileSync('D:/NODEJS/discord-bot/fonts/Margarine/Margarine-Regular.ttf', 'my-font');

            const levelxp = user.level*100;
         const card = new RankCardBuilder()
         .setUsername(target.user.username)
         .setDisplayName(target.user.globalName)
         .setAvatar(target.user.displayAvatarURL({size : 256}))
         .setCurrentXP(user.xp)
         .setRequiredXP(levelxp)
         .setLevel(user.level)
         .setRank(rank)
         .setStatus(target.presence.status)
         
         .setBackground('https://i.pinimg.com/564x/d2/60/09/d26009e68abcb04eac2594e9b20f1eb5.jpg')
         .setOverlay(20)
         .setStyles({
            progressbar: {
              thumb: {
                style: {
                  backgroundColor: '#e27bb1'
                },
              },
              track: {
                style: {
                  backgroundColor: "#e44b8d"
                },
              },
            },
            statistics: {
              level: {
                text: {
                  style: {
                    color: "#FF0000",
                    fontSize : '35px'
                  },
                },
              },
              xp: {
                text: {
                  style: {
                    color: "#FF0000",
                     fontSize : '35px'
                  },
                },
              },
              rank: {
                text: {
                  style: {
                    color: "#FF0000",
                     fontSize : '35px'
                  },
                },
              },


            },
          });

         const data = await card.build({
            format: "png",
          });
            const attachment = new AttachmentBuilder(data);
         interaction.editReply({files : [attachment]});
         return;

}catch(err){
    console.log(err);
}
  } 
};
