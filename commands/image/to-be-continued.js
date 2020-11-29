const { createCanvas, loadImage } = require('canvas');
const { drawImageWithTint } = require('../../util/canvas');
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  try {
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
      const base = await loadImage("https://cdn.discordapp.com/attachments/623994687409225739/716715595089051728/to-be-continued.png");
      const data = await loadImage(URL);
      const canvas = createCanvas(data.width, data.height);
      const ctx = canvas.getContext('2d');
      drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
      const ratio = base.width / base.height;
      const width = canvas.width / 2;
      const height = Math.round(width / ratio);
      ctx.drawImage(base, 0, canvas.height - height, width, height);
      const attachment = canvas.toBuffer();
      if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
      return message.say({ files: [{ attachment, name: 'to-be-continued.png' }] });
  } catch(err) {
    message.say({ files: [{ attachment: "https://cdn.discordapp.com/attachments/623994687409225739/727567331558948874/noneto-be-continued.png", name: 'to-be-continued.png' }] });
  }
};
exports.help = {
  name: 'to-be-continued',
  aliases: ['to-be'],
  info: 'Рисует изображение со стрелкой «Продолжение следует ...»',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  cooldown: 10,
}
