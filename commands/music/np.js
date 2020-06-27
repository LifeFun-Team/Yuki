const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!player) return message.channel.send("Ничего не играет");
  const song = player.songs[0];

message.channel.send(`[__${song.info.title}__](${song.info.uri}) [${song.requestedBy}]\n${player.playing ? "▶ Играет" : "⏸ На паузе"} | Исполнитель: ${song.info.author}\n\n${player.songProgress(message)} [${player.duration(player.player.state.position)} / ${player.duration(song.info.length)}]`);

}
exports.help = {
  name: 'np',
  aliases: [],
  info: '',
  usage: '',
  group: 'music',
  ownerOnly: false,
  sponsor: true,
  cooldown: 10
}
