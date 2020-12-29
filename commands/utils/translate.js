const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
const translate = require('yandex-translate')(`trnsl.1.1.20200507T172732Z.386e968c7a456a10.4910aaa787dedccf8627a4b7f28d5c1d774f98f7`);
exports.run = async (bot, message, args) => {
  
 if(!args[1]) return message.channel.send(`Нужно указать язык и текст для перевода.`)
  
  const text = args.slice(1, 2000).join(" ").replace(/(discord|discordapp)\.(com|gg)\/.*/g, '[INVITE]')
  const lang = {
    "ru": "Русский",
    "en": "Английский",
    "fr": "Французский",
    "bg": "Болгарский",
    "es": "Испанский",
    "tr": "Турецкий",
    "it": "Итальянский",
    "de": "Немецкий",
    "uk": "Украинский"
  }
  const langs = ["en", "ru", "uk", "fr", "bg", "es", "tr", "it", "de"];
  const language = args[0].toLowerCase();
  
  if(!langs.includes(language)) {return message.channel.send(`Языка \`${args[0]}\` не существует`)}
  
    translate.translate(text, {to: args[0]}, function(err, res) {message.channel.send(new MessageEmbed()
  .setTitle(`Переведено на ${lang[args[0]]}`)
  .setDescription(`\`\`\`${res.text}\`\`\``)
  .setColor(color))});
  
}

exports.help = {
  name: 'translate',
  aliases: ['t'],
  info: 'Переводчик',
  usage: 'ru/en/uk/fr/bg/es/tr/it/de',
  group: 'util',
  ownerOnly: false,
  cooldown: 25
}
