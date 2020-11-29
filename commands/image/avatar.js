const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
exports.run = async (bot, message, args) => {

const user = message.mentions.members.first() || message.member;
let emb = new MessageEmbed()
.setTitile("Аватар")
 .setImage(user.avatarURL({dynamic: true, size: 2048}));
message.channel.send({embed:emb})
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
