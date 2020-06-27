const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
if(!message.member.voice.channel) return message.channel.send("Войдите в голосовой канал");
 const player = bot.music.queue.get(message.guild.id);
  if(!player) return message.channel.send("Ничего не играет");
   let i = 0;

message.channel.send(`\`\`\`nimrod\nТекущий трек\n${player.songs[0].info.title} [${player.duration(player.player.state.position)} / ${player.duration(player.songs[0].info.length)}]\n────────────────────\n${player.songs[1] ? `${player.songs.map((songs) => `${i++}. ${songs.info.title} - ${player.duration(songs.info.length)}`).splice(1, 10).join("\n")}${player.songs.length > 11 ? `${player.songs.length - 11}...` : ""}` : "# Нет очереди"}\n\`\`\``)
    
}
exports.help = {
  name: 'queue',
  aliases: ['q'],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
