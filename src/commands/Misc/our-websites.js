const {ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');

module.exports = {
    data : {
        name:'our-websites',
        description : 'You can browse through and go through a bunch of websites created by my creator!:D',
        options : [
            {

                name : 'select',
                description : 'Select any one website you would like to explore!',
                type : ApplicationCommandOptionType.String,
                choices : [
                    {
                        name : 'invoice-gen',
                        value : 'invoice-gen'
                    }
                ]
            }
        ]
    },

    run : ({interaction , client, handler})=>{
        if(interaction.options.get('select').value === 'invoice-gen'){
            const embed = new EmbedBuilder().setTitle("INVOICE GENERATOR :)")
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
    }
}