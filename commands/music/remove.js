const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
 const player = bot.music.queue.get(message.guild.id);
  if(!player) return message.channel.send("Ничего не играет");
   if(!player.playing) player.playing = true;
    if(args[0] > player.songs.length || args[0] < 0 || isNaN(args[0]) || args[0].includes(".")) return message.channel.send("Неверное число");
     player.songs.splice(parseInt(args[0]), 1);

        message.channel.send(`${args[0]} позиция исключена с очереди!`);
    
}
exports.help = {
  name: 'remove',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
