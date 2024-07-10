const {ContextMenuCommandBuilder, ApplicationCommandType} = require('discord.js');

module.exports = {

    data : new ContextMenuCommandBuilder().setName('User Info').setType(ApplicationCommandType.User),

    run : async ({interaction , client, handler})=>{
        const targetUser = interaction.targetUser;
        const target = await interaction.guild.members.fetch(targetUser.id);
        console.log(targetUser);
        const roles = target.roles.cache;
        let listRoles = [];
        roles.forEach((r)=> listRoles.push(r.name));
        console.log(listRoles);
        listRoles = listRoles.filter((a)=> a!=='@everyone');
        const roleString = listRoles.join(', ');
        //console.log(targetUser);

        interaction.reply(`User Info : \n UserName : ${targetUser.username} \n Roles : ${roleString}`);
        return;
    }
}