const { createCanvas, loadImage } = require('canvas');
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say("У меня нету права `Прикреплять файлы`");
  try {
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
      const base = await loadImage("https://media.discordapp.net/attachments/623994687409225739/715644258148679770/brazzers.png");
      const avatar = await loadImage(URL);
      const canvas = createCanvas(avatar.width, avatar.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(avatar, 0, 0);
      const ratio = base.width / base.height;
      const width = avatar.width / 2;
      const height = Math.round(width / ratio);
      ctx.drawImage(base, 0, avatar.height - height, width, height);
      const attachment = canvas.toBuffer();
      if(Buffer.byteLength(attachment) > 8e+6) return message.say('Изображение было выше 8 МБ.');
      return message.say({ files: [{ attachment, name: 'brazzers.png' }] });
  } catch(err) {
    message.say({ files: [{ attachment: "https://cdn.discordapp.com/attachments/623994687409225739/727557214461755443/nonebrazzers.png", name: 'brazzers.png' }] });
  }
};
exports.help = {
  name: 'brazzers',
  aliases: [],
  info: 'Делает картинку пользователя с логотипом brazzers',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
