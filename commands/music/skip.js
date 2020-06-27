const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
  if(!player) return message.channel.send("Ничего не играет");
   if(!player.playing) player.playing = true;

await message.react("⏩");
 player.skip();
    
}
exports.help = {
  name: 'skip',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
