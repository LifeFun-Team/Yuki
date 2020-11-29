const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
exports.run = async (bot, message, args) => {

let member = message.mentions.users.first() || message.author;
  
const attachment = new MessageAttachment(member.user.avatarURL({dynamic: true, size: 2048}));
message.channel.send(attachment);
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
