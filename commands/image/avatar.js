const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
exports.run = async (bot, message, args) => {

let user = message.mentions.users.first() || message.author;
message.channel.send({ files: [{ attachment: user.avatarURL({dynamic: true, size: 2048}), name: `avatar.${user.avatar?.startWith('_a') ? 'gif' : 'jpeg'}`}] })

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
