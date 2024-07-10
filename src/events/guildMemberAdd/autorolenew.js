const autoRole = require('../../models/autoRole');


module.exports = async (member,client,handler)=>{
    console.log(member.user.id);
    console.log(member.guild.id);
    const role = await autoRole.findOne({guildID : member.guild.id});
    if(role){
        const roleID = role.roleID;                  
        await member.roles.add(roleID);
    }
}