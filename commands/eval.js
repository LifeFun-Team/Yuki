const Discord = require("discord.js");
const { owners, color, invisible, prefix} = require('../../config.js');
const moment = require("moment");
require("moment-duration-format");
const util = require("util");
const { days } = require("../../util/functions.js");
const { owner, music } = require('../../structures/emotes');

exports.run = async (bot, message, args) => {   
try {
let evaled = eval(args.join(' ')); 
if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
let eevaled = typeof evaled;
evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
message.channel.send(`
Успешно ✅
Тип: ${tyype}
\n${evaled}`, {code: 'js', split: '\n'})
} catch(err) {
message.channel.send(`Ошибочка ❎
\n${err}`, {code: "js", split: "\n"})}
}

exports.help = {
  name: 'eval',
  aliases: ['e', 'ebal'],
  info: 'емуляция кода.',
  usage: 'Код',
  group: 'owner',
  ownerOnly: true,
  sponsor: false,
  cooldown: 0
}
