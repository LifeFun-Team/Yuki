const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');

exports.run = async (bot, message, args) => {
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!args[0]) return message.say('Укажите пользователя')
if(member == message.author.id) return message.say('Ты не можешь шыперить себя с собой')
if(member == null) return message.say('Пользователь не найден.')
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = `:heart:`.repeat(loveIndex) + `:broken_heart:`.repeat(10 - loveIndex);

        const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`\`${message.author.tag}\` и \`${member.user.tag}\` совместимы на: \`${Math.floor(love)}%\`\n${loveLevel}`);
        message.say(embed);
  }
exports.help = {
  name: 'ship',
  aliases: ['love'],
  info: 'Проверка на совместимость',
  usage: '@Пользователь',
  group: 'role',
  ownerOnly: false,
  cooldown: 5,
}
