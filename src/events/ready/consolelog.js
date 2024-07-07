const { ButtonKit } = require('commandkit');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const roles = [
    { id: '1259096088263004220', label: 'Swiftie' },
    { id: '1259096227736453151', label: 'oliveoil rodrigo' },
    { id: '1259096433374658631', label: 'kanye poop' },
    { id: '1259111374617972878', label: 'Billie EyeLash' },
    { id: '1259111702696296449', label: 'Conans sweater' }
];

const roles2 = [
    { id: '1259111921165271183', label: 'Gracie Abrahms' },
    { id: '1259111776755122269', label: 'Harry styli' }
];

module.exports = async (c, client, handler) => {
    try {
        const channel = c.channels.cache.get('1259093985079857185');
        if (!channel) {
            return;
        }

        const row = new ActionRowBuilder();

            roles.forEach((role)=>{
                const button = new ButtonKit()
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
                .setCustomId(role.id).setEmoji('🩰');
                row.components.push(button);
            })

            const row2 = new ActionRowBuilder();

            roles2.forEach((role)=>{
                const button = new ButtonKit()
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
                .setCustomId(role.id).setEmoji('🩰');
                row2.components.push(button);
            })

            const message = await channel.send({
                content: `Click the buttons, to get a role that suits you!`,
                components: [row,row2]
            });


            const components = [ ...row.components, ...row2.components ];


            components.forEach((button)=>{
                //console.log(button);
                button.onClick(async (interaction) => {
                    await interaction.deferReply({ ephemeral: true });
                    console.log(interaction);
                    const roleInstance = interaction.guild.roles.cache.get(interaction.customId);
                    //console.log(interaction.guild.roles.cache);
                    if (!roleInstance) {
                        interaction.editReply({ content: 'Could not find that role! :(' });
                        return;
                    }
    
                    const hasRole = interaction.member.roles.cache.has(roleInstance.id);
                    if (hasRole) {
                        await interaction.member.roles.remove(roleInstance.id);
                        interaction.editReply({ content: `${roleInstance.name} removed!` });
                    } else {
                        await interaction.member.roles.add(roleInstance.id);
                        interaction.editReply({ content: `${roleInstance.name} has been added! :)` });
                    }
                }, { message });
            })


    } catch (err) {
        console.log(err);
    }
};
