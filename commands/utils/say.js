exports.run = async (bot, message, args) => {
if(!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.say(`У меня нет прав на \`управление сообщениями\``);
if(!args[0]) return message.say("Укажите текст");
  
const say = args.slice(0).join(" ").replace(/(discord|discordapp)\.(com|gg)\/.*/g, '[INVITE]');
message.delete();
message.say(say);
  
};
exports.help = {
  name: 'say',
  aliases: ['echo'],
  info: 'Отправить сообщение от имени бота.',
  usage: 'Текст',
  group: 'util',
  ownerOnly: false,
  cooldown: 5
}
