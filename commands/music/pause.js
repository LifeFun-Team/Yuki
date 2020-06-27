const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
 const player = bot.music.queue.get(message.guild.id);
  if(!player) return message.channel.send("Ничего не играет");
   if(!player.playing) return message.channel.send("Плеер и так на паузе");

await message.react("⏸");
 player.pause();   
}
exports.help = {
  name: 'pause',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
