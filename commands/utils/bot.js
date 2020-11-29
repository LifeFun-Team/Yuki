const { MessageEmbed, version } = require('discord.js');
const { color } = require('../../config.js');
const { owner } = require('../../structures/emotes');
const moment = require(`moment`);
require(`moment-duration-format`);
exports.run = async (bot, message, args) => {
  
  const embed = new MessageEmbed()
  .addField(`Шардов`, `${bot.shard.count.toLocaleString()}`, true)
  .addField(`Серверов`, `${await bot.shard.fetchClientValues('guilds.cache.size').then(r => r.reduce((a,b) => Number(a+b).toLocaleString()))}`, true)
  .addField(`Пользователей`, `${await bot.shard.fetchClientValues('users.cache.size').then(r => r.reduce((a,b) => Number(a+b).toLocaleString()))}`, true)
  .addField(`Команд`, `${bot.commands.size.toLocaleString()}`, true)
  .addField(`Время работы`,  moment.duration(bot.uptime).format(` D [День], H [час(ов)], m [минут(а)], s [Секунд(а)]`))
  .addField(`Discord.js`, `v${version}`, true)
  .addField(`Node.js`, `${process.version}`, true)
  .setColor(color);
  message.say(embed);
}

exports.help = {
  name: 'bot',
  aliases: ['status', 'stats', 'bot-status'],
  info: 'Статистика бота',
  usage: '',
  group: 'util',
  ownerOnly: false,
  cooldown: 10
}
