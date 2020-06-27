const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
 const player = bot.music.queue.get(message.guild.id);
  if(!player) return message.channel.send("Ничего не играет");
   player.loop = !player.loop;
        
message.channel.send(`Повторение очереди ${player.loop ? "`включено`" : "`выключено`"}`);
    }
exports.help = {
  name: 'loop',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
