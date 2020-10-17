const Discord = require("discord.js");
const dotenv = require("dotenv");
const execute = (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle("User Info:")
    .setAuthor(message.author.tag, message.member.user.displayAvatarURL())
    .setColor('#e4b400')
    .setImage('https://media.giphy.com/media/fYXzt6IWhHs7oh34kg/giphy.gif')
    .addField('Nome:',` ${message.author.username}`)
    .addField('Id:',`${message.author.id}`)
    .addField('Atividade:',` ${message.author.presence.status}`)
    .addField('Dúvidas?','Em caso de dúvidas mencionem o cargo: <@&677570004148813826>')
    .setFooter(message.author.tag, message.author.avatarURL());
    message.channel.send(embed);
}
module.exports = {
    name: "userinfo",
    execute,
}

