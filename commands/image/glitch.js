const { createCanvas, loadImage } = require('canvas');
const { distort } = require('../../util/canvas');
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  try {
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
      const data = await loadImage(URL);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(data, 0, 0);
      distort(ctx, 20, 0, 0, data.width, data.height, 5);
      const attachment = canvas.toBuffer();
      if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
      return message.say({ files: [{ attachment, name: 'glitch.png' }] });
  } catch(err) {
    message.say({ files: [{ attachment: "https://cdn.discordapp.com/attachments/623994687409225739/727564117896069120/noneglitch.png", name: 'glitch.png' }] });
  } 
};
exports.help = {
  name: 'glitch',
  aliases: [],
  info: 'Делает картинку с эфектом глюка',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  cooldown: 10
}
