const { MessageEmbed } = require('discord.js');
const { invisible } = require('../../config.js');
const fetch = require('node-fetch');

exports.run = async (bot, message, args) => {
let member = message.guild.member(message.mentions.users.first());
 if(!args[0]) return message.say("Вы не указали пользователя");
  if(!member) return message.say('Пользователь не найден');
   if(member.id === message.author.id) return message.say("Вы не можете пощекотать сам себя");
    if(member.user.bot) return message.say("Вы не можете пощекотать бота");

const body = await fetch("https://nekos.life/api/v2/img/tickle").then(r => r.json()).then(r => r.url);
 const embed = new MessageEmbed()
  .setColor(invisible)
   .setDescription(`${message.author} пощекотал(а) ${member.user}`)
    .setImage(body)
     message.channel.send(embed)
 };

exports.help = {
  name: 'tickle',
  aliases: [],
  info: 'Пощекотать пользователя',
  usage: '@Пользователь',
  group: 'role',
  ownerOnly: false,
  cooldown: 5
}
