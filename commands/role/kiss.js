const { MessageEmbed } = require('discord.js');
const { invisible } = require('../../config.js');
const fetch = require('node-fetch');

exports.run = async (bot, message, args) => {
let member = message.guild.member(message.mentions.users.first());
 if(!args[0]) return message.say("Вы не указали пользователя");
  if(!member) return message.say('Пользователь не найден');
   if(member.id === message.author.id) return message.say("Вы не можете поцеловать сам себя");
    if(member.user.bot) return message.say("Вы не можете поцеловать бота");
  
const body = await fetch("https://nekos.life/api/v2/img/kiss").then(r => r.json()).then(r => r.url);
 const embed = new MessageEmbed()
  .setColor(invisible)
   .setDescription(`${message.author} поцеловал ${member.user}`)
    .setImage(body)
     message.say(embed)
 };

exports.help = {
  name: 'kiss',
  aliases: [],
  info: 'Поцеловать пользователя',
  usage: '@Пользователь',
  group: 'role',
  ownerOnly: false,
  sponsor: false,
  cooldown: 5
}
