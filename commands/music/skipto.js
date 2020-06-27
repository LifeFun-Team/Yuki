const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
  if(!player) return message.channel.send("Ничего не играет");
   if(!player.playing) player.playing = true;
    if(!args[0]) return message.channel.send("Укажите номер очереди");
     if(args[0] > player.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes(".")) return message.reply(`Неверное число. В текущей очереди ${player.songs.length} треков ]`);
     
player.songs.splice(0, parseInt(args[0] - 1));
 player.skip();
  message.channel.send(`пропущено до ${args[0]} трека`);
    
}
exports.help = {
  name: 'skip-to',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
