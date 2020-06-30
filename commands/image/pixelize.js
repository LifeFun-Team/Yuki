const { createCanvas, loadImage } = require('canvas');
const { sepia } = require('../../util/canvas');
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  try {
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
      const data = await loadImage(URL);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			const width = canvas.width * 0.15;
			const height = canvas.height * 0.15;
			ctx.drawImage(data, 0, 0, width, height);
			ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
			const attachment = canvas.toBuffer();
			if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
			return message.say({ files: [{ attachment, name: 'pixelize.png' }] });
  } catch(err) {
    message.say({ files: [{ attachment: "https://cdn.discordapp.com/attachments/623994687409225739/727566189563347048/nonepixelize.png", name: 'pixelize.png' }] });
  }
};
exports.help = {
  name: 'pixelize',
  aliases: ['pixel'],
  info: 'Рисует изображение или аватар пользователя в пикселях.',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
