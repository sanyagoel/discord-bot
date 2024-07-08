const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const ms = require('ms');
const {default : prettyMs} = import('pretty-ms');
module.exports = {
    data : {
        name: 'timeoutperson',
        description : 'If you want to timeout a person whos yapping too much',
        options : [
            {
                name : 'person',
                description : 'Person whom you want to timeout!',
                type : ApplicationCommandOptionType.Mentionable,
                required : true
            },
            {
                name : 'duration',
                description : 'For how long, s , h or d (seconds hours or days)',
                type : ApplicationCommandOptionType.String,
                required : true
            },
            {
                name : 'reason',
                description : 'Reason for timing out!',
                type : ApplicationCommandOptionType.String
            }
        ]
    }

    , run : async ({interaction, client,handler})=>{
        await interaction.deferReply();
            const targetUserId = interaction.options.get('person').value;
            const reason = interaction.options.get('reason')?.value || 'Reason Not Provided';
            const duration = interaction.options.get('duration').value;

            const target = await interaction.guild.members.fetch(targetUserId);
            if(!target){
                interaction.editReply(`${target.user.username} is not a part of this server...`);
                return;
            }

            if(target.id == interaction.guild.ownerId){
                interaction.editReply('You cannot timeout the owner :/');
                return;
            }
            if(ms(duration)>ms('28d')){
                interaction.editReply('You cannot assign a timeout of more than 28 days bruh.');
                return;
            }
            const msDuration = ms(duration);
            if(isNaN(msDuration)){
                interaction.editReply('Please provide valid duration! -_-');
                return;
            }

            console.log(interaction.member.id);

            const targetPosition = target.roles.highest.position;
            const userPosition = interaction.member.roles.highest.position;
            const botPosition = interaction.guild.members.me.roles.highest.position;
            if(targetPosition>=userPosition && (interaction.member.id != interaction.guild.ownerId)){
                interaction.editReply(`${target.user.username} is out of your roles league.`);
                return;
            }

            if(targetPosition>=botPosition){
                interaction.editReply(`${target.user.username} is out of MY roles league`);
                return;
            }

            try{
                console.log(msDuration);
                //const prettyDuration = prettyMs(msDuration, {verbose : true});
                const prettyDuration = ms(msDuration, {long : true});

                if(target.isCommunicationDisabled()){
                    await target.timeout(msDuration,reason);
                    interaction.editReply(`${target.user.username} was already on timeout. Updated to new timeout ( ${prettyDuration} )! xD`);
                    return;
                }
                await target.timeout(msDuration,reason);
                interaction.editReply(`${target.user.username} has been given the timeout succesfully ( ${prettyDuration} )! :D`);
                return;
            }catch(err){
                console.log(err);
                interaction.editReply('Sorry, there was an error timing out your target! :(');
                return;
            }

    },

    options : [
        userPermissions = [PermissionFlagsBits.MuteMembers],
        botPermissions = [PermissionFlagsBits.MuteMembers]
    ]
}