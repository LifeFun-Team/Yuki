const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
exports.run = async (bot, message, args) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.id;
if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send(`У меня нету права \`Встраивать ссылки \``);

let embed = new MessageEmbed()
.setDescription(`[${member.user.tag}]("+member.user.avatarURL({dynamic: true, size: 2048})+")`)
.setImage(member.user.avatarURL({dynamic: true, size: 2048}))
.setColor(color)
.setTimestamp();

message.channel.send(embed)
};

exports.help = {
  name: 'avatar',
  aliases: ['ava'],
  info: 'Выдает аватар пользователя',
  usage: '@Пользователь',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
