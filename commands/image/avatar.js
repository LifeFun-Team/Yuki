const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
exports.run = async (bot, message, args) => {

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.id;
message.channel.send({ files: [{ attachment: member, name: `avatar.${member.avatar?.startWith('_a') ? 'gif' : 'jpeg'}`}] })

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
