const { createCanvas, loadImage } = require('canvas');
exports.run = async (bot, message, args) => {

if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.id;
let URL = member.user.avatarURL({dynamic: true, size: 2048}      
const avatar = await loadImage(URL);
      const canvas = createCanvas(avatar.width, avatar.height);
      const attachment = canvas.toBuffer();
      if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
      return message.say({ files: [{ attachment, name: 'avatar.png' }] });
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
