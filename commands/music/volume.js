const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
  if(!player) return message.channel.send("Ничего не играет");
   if(!args[0]) return message.channel.send(`Громкость ${player.volume}%`);
    if(isNaN(args[0]) || args[0].includes(".") || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) return message.channel.send(`Пожалуйста, введите громкость как натуральное число от 1 до 100`);

player.setVolume(parseInt(args[0].replace("%", "")));
 message.channel.send(`Громкость ${parseInt(args[0])}% установлена`);
    
}
exports.help = {
  name: 'volume',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
