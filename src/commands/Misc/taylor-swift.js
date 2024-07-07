
const positiveAdjectives = [
    "affectionate",
    "agreeable",
    "amiable",
    "bright",
    "charming",
    "creative",
    "determined",
    "diligent",
    "diplomatic",
    "dynamic",
    "energetic",
    "friendly",
    "funny",
    "generous",
    "giving",
    "gregarious",
    "hardworking",
    "helpful",
    "kind",
    "likable",
    "loyal",
    "patient",
    "polite",
    "sincere",
    "amazing",
    "awesome",
    "blithesome",
    "excellent",
    "fabulous",
    "favorable",
    "fortuitous",
    "gorgeous",
    "incredible",
    "unique",
    "mirthful",
    "outstanding",
    "perfect",
    "philosophical",
    "propitious",
    "remarkable",
    "rousing",
    "spectacular",
    "splendid",
    "stellar",
    "stupendous",
    "super",
    "upbeat",
    "stunning",
    "wondrous",
  ];
  



module.exports = {

    data :  {
        name : 'taylor-swift',
        description : 'Gives fact about taylor swift!'
    },

    run : ({interaction , client , handler})=>{
        let random = Math.floor(Math.random()*positiveAdjectives.length);
        let word = positiveAdjectives[random];
        const roles = interaction.member.roles.cache;
        console.log(roles);
        const roleNames = roles.map(role => role.name);
        console.log(roleNames);
        const hasSwiftie = roleNames.find((role)=>role === 'oliveoilrodrigo');
        if(!hasSwiftie){
           return interaction.reply('You gotta get the swiftie role first !<3');
        }
        // const hasRole = interaction.members.roles.cache.has()
        interaction.reply(`Taylor Swift is ${word}`);
    },

    options : {
        devOnly : true
    }
}