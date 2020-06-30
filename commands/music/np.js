const { MessageEmbed } = require("discord.js");
const {invisible} = require('../../config.js');
const moment = require("moment");
require("moment-duration-format");
exports.run = async (bot, message, args) => {
const player = bot.music.queue.get(message.guild.id);
 if(!player) return message.channel.send("Ничего не играет");
  const song = player.songs[0];

message.channel.send(new MessageEmbed().setDescription(`[__${song.info.title}__](${song.info.uri}) [${song.requestedBy}]\n${player.playing ? "▶ Играет" : "⏸ На паузе"} | Исполнитель: ${song.info.author}\n\n${player.songProgress(message)} [${moment.duration(player.player.state.position, "ms").format("hh:mm:ss", { trim: false })} / ${moment.duration(song.info.length, "ms").format("hh:mm:ss", { trim: false })}]`).setColor(invisible));
};
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
