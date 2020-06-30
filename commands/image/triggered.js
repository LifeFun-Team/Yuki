const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const { drawImageWithTint, streamToArray } = require('../../util/canvas');
const coord1 = [-25, -33, -42, -14];
const coord2 = [-25, -13, -34, -10];
exports.run = async (bot, message, args) => {
  if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.say(`У меня нету права \`Прикреплять файлы\``);
  try {
  let URL = message.attachments.first() ? message.attachments.first().url : null || message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png', size: 2048}) : null|| message.author.avatarURL({format: 'png', size: 2048}) || message.id
      const base = await loadImage("https://media.discordapp.net/attachments/623994687409225739/715661674916347934/triggered.png");
      const avatar = await loadImage(URL);
      const encoder = new GIFEncoder(base.width, base.width);
      const canvas = createCanvas(base.width, base.width);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, base.width, base.width);
      const stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(200);
      for (let i = 0; i < 4; i++) {
      drawImageWithTint(ctx, avatar, 'red', coord1[i], coord2[i], 300, 300);
      ctx.drawImage(base, 0, 218, 256, 38);
      encoder.addFrame(ctx);
       }
      encoder.finish();
      const buffer = await streamToArray(stream);
      return message.say({ files: [{ attachment: Buffer.concat(buffer), name: 'triggered.gif' }] });
  } catch(err) {
    message.say({ files: [{ attachment: "https://cdn.discordapp.com/attachments/623994687409225739/727568575614943302/triggered.gif", name: 'triggered.gif' }] });
  }
};
exports.help = {
  name: 'triggered',
  aliases: ['trigger'],
  info: 'Переделывает аватар пользователя под бомбящего',
  usage: '@Пользователь | Картинка',
  group: 'image',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
