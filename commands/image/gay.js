const { createCanvas, loadImage } = require('canvas');

exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
  const base = await loadImage("https://media.discordapp.net/attachments/623994687409225739/715659626833772554/rainbow.png");
  const avatar = await loadImage(URL);
  const canvas = createCanvas(avatar.width, avatar.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(avatar, 0, 0);
  ctx.drawImage(base, 0, 0, avatar.width, avatar.height);
  const attachment = canvas.toBuffer();
  if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
  return message.say({ files: [{ attachment, name: 'rainbow.png' }] });
};

exports.help = {
  name: 'gay',
  aliases: ['rainbow'],
  info: 'Делает картинку с эфектом флага геев',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
