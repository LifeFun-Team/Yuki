const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
 if(!message.member.voice.channel.permissionsFor(bot.user).has("VIEW_CHANNEL")) return message.channel.send("У меня нету права на `Просмотр канала`");
  if(!message.member.voice.channel.permissionsFor(bot.user).has("CONNECT")) return message.channel.send("У меня нету права `Подключиться`");
   if(!message.member.voice.channel.permissionsFor(bot.user).has("SPEAK")) return message.channel.send("У меня нету права `Говорить`");
    if(!message.member.voice.channel.joinable) return message.channel.send("Я не могу подключиться к голосовому каналу поскольку он переполнен");
     if(!args.join(" ")) return message.channel.send("Укажите название или URL трека");

let song = await bot.music.getSongs(args.join(" ")) || await bot.music.getSongs(`ytsearch: ${args.join(" ")}`) || await bot.music.getSongs(`scsearch: ${args.join(" ")}`);
 if(!song[0]) return message.channel.send("Я не нашла данный трек");
  bot.music.handleVideo(message, message.member.voice.channel, song[0])
}
exports.help = {
  name: 'play',
  aliases: ['p'],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
