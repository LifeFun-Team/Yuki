const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
  if(!player) return message.channel.send("Ничего не играет");
   if(args[0].includes(".") || args[0].split(":").some(t => isNaN(t))) return message.channel.send(`Невозможно перематать на ${args[0]}`);

const seeked = player.seek(...args[0].split(":").reverse().map(t => parseInt(t)));
message.channel.send(`Перемотано на ${[seeked]}`);
    
}
exports.help = {
  name: 'seek',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
