const translate = require('yandex-translate')(`trnsl.1.1.20200507T172732Z.386e968c7a456a10.4910aaa787dedccf8627a4b7f28d5c1d774f98f7`);
exports.run = async (bot, message, args) => {
  
  if(!msg.channel.permissionsFor(msg.guild.me).has("EMBED_LINKS")) return msg.channel.send(`У меня нету права \`Встраивать ссылки \``);
  if(!args[1]) return succ(`Нужно указать язык и текст для перевода.`)
  
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
  
  if(!langs.includes(language)) {return succ(`Языка \`${args[0]}\` не существует`)}
  
    translate.translate(text, {to: args[0]}, function(err, res) {msg.channel.send(new Discord.MessageEmbed()
  .setTitle(`<:translate:708296135571406918> Переведено на ${lang[args[0]]}`)
  .setDescription(`\`\`\`${res.text}\`\`\``)
  .setColor(c.color)
  .setFooter(c.footer, bot.user.avatarURL({dynamic: true}))
  .setTimestamp())}); 
  
}
