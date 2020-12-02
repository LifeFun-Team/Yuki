const { MessageEmbed } = require('discord.js');
const { owners, color, prefix} = require('../../config.js');
const { owner } = require('../../structures/emotes');
exports.run = async (bot, message, args) => {
   if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send(`У меня нету права \`Встраивать ссылки \``);
  function list(group) {
            return bot.commands.filter(c => c.help.group == group).map(c => `\`${c.help.name}\``).join(", ");
        }
if(!args[0]) {
  const embed = new MessageEmbed()
   .setTitle('Список команд')
   .setColor(color)
   .addField('❯ Утилита', list("util"))
   .addField('❯ Реакции', list("role"))
   .addField('❯ Мини игры', list("game"))
   .addField('❯ Изображение', list("image"))
   if(owners.includes(message.author.id)) embed.addField(`${owner} Разработчикам`, list("owner"))
   embed.addField('Полезные ссылки', `[\`Пригласить\`](${await bot.generateInvite(3459168)}) | [\`Сервер поддержки\`](https://discord.gg/XDkFTMK) | [\`SD.C\`](https://bots.server-discord.com/618162110710677524)`)
   .setFooter(`${prefix}help [Команда]`)
   return message.say(embed);
  };

const command = bot.commands.get(args[0]) || bot.commands.find(c => c.help.aliases.includes(args[0]));
if(!command || command.unlisted) return message.say(`Неизвестная команда`);

  const embed = new MessageEmbed()
    .setTitle(`Подробнее о ${command.help.name}`)
    .setColor(color)
    .addField('Описание', command.help.info)
    .addField('Использование', `\`${prefix}${command.help.name} ${command.help.usage}\``)
    .addField('Вариации', command.help.aliases.map(a => `\`${a}\``).join(', ') || 'Нету')
    .addField('Таймаут', `\`${command.help.cooldown}\` секунд`)
     message.say(embed)
}

exports.help = {
  name: 'help',
  aliases: ['h'],
  info: 'Список доступных команд',
  usage: '[Команда]',
  group: 'util',
  ownerOnly: false,
  cooldown: 5
}
