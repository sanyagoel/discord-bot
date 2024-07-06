require('dotenv').config();

const {Client , IntentsBitField , ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages
    ]
});

const roles = [
    {
        id: '1259096088263004220',
        label : 'Swiftie'
    },

    {
        id : '1259096227736453151',
        label : 'oliveoil rodrigo'
    }, {

        id :'1259096433374658631',
        label : 'kanye poop'
    } , {
        id : '1259111374617972878',
        label : 'Billie EyeLash'
    } , {
        id : '1259111702696296449',
        label : 'Conans sweater'
    }
]

const roles2 = [{
    id : '1259111921165271183',
    label : 'Gracie Abrahms'
},

{
    id : '1259111776755122269',
    label : 'Harry stylish'
}]



client.on('ready',async (c)=>{
 try{
    const channel = c.channels.cache.get('1259093985079857185');
    if(!channel){
        return;
    }
    const row = new ActionRowBuilder();

    roles.forEach((role)=>{
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary).setEmoji('🫀')
        )
    })
    await channel.send({

        content : 'Choose a role!!',
        components : [row]
    }
    )

    const row2 = new ActionRowBuilder();

    roles2.forEach((role)=>{
       row2.components.push(new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary).setEmoji('🩰'));
    })

    await channel.send({
        content : 'Or... you can choose from these roles!',
        components : [row2]
    })
    process.exit();
 }catch(err){

 }

})

client.login(process.env.BOT_TOKEN);