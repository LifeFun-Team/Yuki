const { createCanvas, loadImage } = require('canvas');
const { sepia } = require('../../util/canvas');
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
			const data = await loadImage(URL);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			sepia(ctx, 0, 0, data.width, data.height);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
			return message.say({ files: [{ attachment, name: 'sepia.png' }] });
	}

exports.help = {
  name: 'sepia',
  aliases: [],
  info: 'Рисует изображение или аватар пользователя в сепии.',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
