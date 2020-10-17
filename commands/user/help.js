const Discord = require("discord.js");
const dotenv = require("dotenv");

const execute = (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`Bem vindo ${message.author.tag}`)
    .setColor(`#2b00ff`)
    .setImage('https://media.giphy.com/media/hvYQeUigfMFnN3xhxM/giphy.gif')
    .setDescription(`${process.env.BOT_PREFIX}clear = Limpa o chat de 0 à 100 mensagens\n
    ${process.env.BOT_PREFIX}userinfo = Mostra as informações do usuário \n    ${process.env.BOT_PREFIX}ticket = Abre um ticket.\n
    ${process.env.BOT_PREFIX}Kiss = Beija algúem \n
    ${process.env.BOT_PREFIX}Roll = Roda um dado \n
    ${process.env.BOT_PREFIX}Ticket = Abre um ticket\n`)
    .setFooter(message.author.tag, message.author.avatarURL());
    message.channel.send(embed);
}




module.exports = {
    name: "help",
    execute,
}