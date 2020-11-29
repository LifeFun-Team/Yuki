exports.run = async (bot, message, args) => {
const guild = bot.guilds.cache.get(args[0])
 if(!args[0]) return message.say(`А сервер где блдяь?`)
  if(!guild) return message.say(`Вы указали неверный идентификатор сервера, или меня нету этом сервере`);
   await guild.leave();
    message.say(`Я ушла с \`${guild.id}\``);
}
exports.help = {
  name: 'leave',
  aliases: [],
  info: 'Без коминтариев',
  usage: '',
  group: 'owner',
  ownerOnly: true,
  cooldown: 10,
}
