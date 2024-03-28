const Discord = require('discord.js');
const {
  Client,
  IntentsBitField
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers
  ],
});

client.on("ready", () => {
  console.log(`Бот ${client.user.tag} запущен.`);
});

client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === '!unbanall') {
    if (!message.guild || !message.member.hasPermission('BAN_MEMBERS')) {
      message.reply('У вас нет прав для разбана пользователей.');
      return;
    }

    message.guild.fetchBans().then((bans) => {
      bans.forEach((banInfo) => {
        message.guild.members.unban(banInfo.user)
          .then((unbannedUser) => {
            message.channel.send(`Пользователь ${unbannedUser.tag} успешно разбанен.`);
          });
      });

      message.reply('Все забаненные пользователи успешно разбанены.');
    });
  } 
});

client.login('TOKEN');
