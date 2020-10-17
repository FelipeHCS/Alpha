const Discord = require("discord.js");
const dotenv = require("dotenv"); // Arquivos de pastas. 
const fs = require("fs"); // Serve para ler os conteúdos de algo!
const path = require("path"); // Puxar as pastas.

dotenv.config(); /*Configuração DOTENV*/

const bot = new Discord.Client()
bot.commands = new Discord.Collection();
bot.queues = new Map();
const usersMap = new Map() //Anti-Spam

const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

const folders = fs.readdirSync(path.join(__dirname, "/commands"))
for (var folder of folders) {
    const files = fs.readdirSync(path.join(__dirname, "/commands", folder)).filter((filename) => /^.*\.(t|j)s$/.test(filename))
    for (var filename of files) {
        const command = require(`./commands/${folder}/${filename}`);
        bot.commands.set(command.name, command);
    }
}

for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

console.log(bot.commands); /*Mapa dos comandos no terminal */

bot.on('ready', () => { /*Atividade do bot (LET STATUS)*/
    let activities = [
        `Digite a.help`,
        `Minecraft`,
        `Call Of Duty Modern Warfare`,
        `X-Plane 11`,
        `Grand Theft Auto V`,
        `Digite a.help`,
        `Spotify`,
        `Arma 3`,
        `PUBG`,
        `Digite a.help`,
        `Bot AP10 V2.0`,
        `Criado por @Felipe Hilário #5995`,
        `Visual Studio Code`,
        `Digite a.help`
    ],
        i = 0; /*Não deixa as frases se repetirem!*/
    setInterval(() => bot.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: "PLAYING"
    }), 1000 * 60); /*Tempo de intervalo.*/

    console.log(`--------------------//Status do Bot//-----------------\n 
    ${bot.user.username} foi conectado com sucesso e já estamos em ${bot.guilds.cache.size} servidores ( ͡° ͜ʖ ͡°) \n 
    ----------------//Status do Bot//-----------------`);
}); /*Mensagem no terminal */

//Comando react

bot.on('raw', async dados => {
    if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if (dados.d.message_id !== "737686403961585725") return //Id da mensagem

    let servidor = bot.guilds.cache.get("677548388165615636")//Id do Servidor
    let membro = servidor.members.cache.get(dados.d.user_id)//Id do membro

    let cargo1 = servidor.roles.cache.get('677572221320953897') // Id do cargo 1
    let cargo2 = servidor.roles.cache.get('735144827708112906') // Id do cargo 2
    let cargo3 = servidor.roles.cache.get('733748412872130640') // Id do cargo 3

    if (dados.t === "MESSAGE_REACTION_ADD") {
        if (dados.d.emoji.name === "✈️") {
            if (membro.roles.cache.has(cargo2)) return
            membro.roles.add(cargo2)
        } else if (dados.d.emoji.name === "🔫") {
            if (membro.roles.cache.has(cargo3)) return
            membro.roles.add(cargo3)
        }
    }
    if (dados.t === "MESSAGE_REACTION_REMOVE") {
        if (dados.d.emoji.name === "✈️") {
            if (membro.roles.cache.has(cargo2)) return
            membro.roles.remove(cargo2)
        } else if (dados.d.emoji.name === "🔫") {
            if (membro.roles.cache.has(cargo3)) return
            membro.roles.remove(cargo3)
        }
    }
})

bot.on("guildMemberAdd", async (member) => {

    let role = member.guild.roles.cache.get("764636649451290664") //id do cargo automático
    member.roles.add(role);
    let channel = bot.channels.cache.get("706539011950247958"); // Id do canal.
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === '');

    let embed = new Discord.MessageEmbed()
        .setColor('#50ff00')
        .setTitle(`🕵️ **| Entrada**`)
        .setDescription(`${member.user} Entrou no servidor **${member.guild.name}**, agora estamos com **${member.guild.memberCount}** no servidor.`)
        .addField('🗓️ Criação:', `${member.user.createdAt}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL());
    await channel.send(embed)
})
bot.on("guildMemberRemove", async (member) => {

   let channel = bot.channels.cache.get("712088551944224818"); // Id do canal.
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === '');

    let embed = new Discord.MessageEmbed()
        .setColor('#50ff00')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`🕵️**| Saiu do servidor!**`)
        .setDescription(`O usuário ${member.user} saiu do servidor, agora estamos com ${member.guild.memberCount} no servidor.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL());
    await channel.send(embed)
})

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.member.hasPermission("ADMINISTRATOR")) {
    } else if (message.content.includes('https://discord.gg/') || message.content.includes('discord.gg/')) {
        message.delete();
        return message.reply('É proibido enviar convites de outros servidores aqui 👮‍♂️ ')
    };

    if (usersMap.has(message.author.id)) {
        const dataUser = usersMap.get(message.author.id);
        let msgCount = dataUser.msgCount;
        ++msgCount;
        if (parseInt(msgCount) === 10) {
            const roleMute = message.guild.roles.cache.get('752159673104334949');
            message.member.roles.add(roleMute);
            message.channel.bulkDelete(10, true)
            message.channel.send('Você foi mutado 👮‍♂️');
            setTimeout(() => {
                message.member.roles.remove(roles);
                message.channel.send('Você foi desmutado, juízo 👮‍♂️ ');
            }, 10000)
        } else {
            dataUser.msgCount = msgCount;
            usersMap.set(message.author.id, dataUser)
        }
    } else {
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: null
        });
        setTimeout(() => {
            usersMap.delete(message.author.id);
        }, 10000)
    }
    if (message.content.toLowerCase().startsWith(process.env.BOT_PREFIX)) {
        const args = message.content.toLowerCase().slice(process.env.BOT_PREFIX.length).split(" ");
        const command = args.shift();
        try {
            bot.commands.get(command).execute(bot, message, args);
        } catch (e) {
            return message.reply("não reconheço este comando 😔");
        }
    }
})

bot.login(process.env.BOT_TOKEN);
