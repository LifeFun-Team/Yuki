const { MessageEmbed, version } = require('discord.js');
const { color, sdc } = require('../../config.js');
const fetch = require('node-fetch');
exports.run = async (bot, message, args) => {
 if(!args[0]) return message.say("Введите цвет в Hex")
  let isOk = /^[0-9A-F]{6}$/i.test(args[0])
  if(isOk === false) return message.say("Пожалуйста, предоставьте действительный Hex код без #")
  
  const body = await fetch(`https://api.alexflipnote.dev/color/${args.join(" ")}`,{
            headers: { "Authorization": "HGgH-F_jatuQPoL8blOysyzkHHiGUDY_5oXxLG1r"}
        }).then(r => r.json());
  
  const embed = new MessageEmbed()
  .setColor(color)
  .setTitle("Цвет: " + body.name)
  .setDescription("Hex: " + body.hex + '\n' + "RGB: " + body.rgb)
  .setImage(body.image)
  message.say(embed);
}

exports.help = {
  name: 'color',
  aliases: [],
  info: 'Ищет указаный цвет',
  usage: 'цвет в формате hex',
  group: 'util',
  ownerOnly: false,
  sponsor: false,
  cooldown: 5,
}
