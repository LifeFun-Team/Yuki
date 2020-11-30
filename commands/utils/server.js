const { MessageEmbed, version } = require('discord.js');
const { color } = require('../../config.js');
const { days } = require("../../util/functions.js");

exports.run = async (bot, message, args) => {

if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send(`У меня нету права \`Встраивать ссылки \``);
  
const verifilv = {
"NONE": "`Отсутствует`",
"LOW":"Низкий",
"MEDIUM":"Средний",
"HIGH":"(╯°□°）╯︵ ┻━┻",
"VERY_HIGH":"Очень высокий"};
  
let region = {
"brazil": ":flag_br: Бразилия",
"eu-central": ":flag_eu: Центральная Европа",
"europe": ":flag_eu: Европа",
"singapore": ":flag_sg: Сингапур",
"us-central": ":flag_us: Центр США",
"sydney": ":flag_au: Сидней",
"us-east": ":flag_us: Восток США",
"us-south": ":flag_us: Юг США",
"us-west": ":flag_us: Запад США",
"eu-west": ":flag_eu: Западная Европа",
"vip-us-east": ":flag_us: VIP Восток США",
"london": ":flag_gb: Лондон",
"amsterdam": ":flag_nl: Амстердам",
"hongkong": ":flag_hk: Гонконг",
"russia": ":flag_ru: Россия",
"southafrica": ":flag_za: Южная Африка"};
  
let users = message.guild.memberCount;
let memb = message.guild.members.cache.filter(x => !x.user.bot).size
let bots = message.guild.members.cache.filter(mem => mem.user.bot === true).size;
let chan = message.guild.channels.cache.size;
  
const embed = new MessageEmbed()
.setAuthor(`Информация о ${message.guild.name}`)
.addField(`Владелец`, `${message.guild.owner.user.tag}`)
.addField(`ID`, `${message.guild.id}`)
.addField(`Каналов[${chan}]`, `Категорий: ${message.guild.channels.cache.filter(c => c.type == "category").size}\nТекстовых: ${message.guild.channels.cache.filter(c => c.type == "text").size}\nГолосовых: ${message.guild.channels.cache.filter(c => c.type == "voice").size}`)
.addField(`Участники[${users}]`, `Людей: ${memb}\nБотов: ${bots}`)
.addField(`Прочее`, `Ролей: ${message.guild.roles.cache.size - 1}\nЭмодзи: ${message.guild.emojis.cache.size}`)
.addField(`Регион`, region[message.guild.region])
.addField(`Уровень проверки`, verifilv[message.guild.verificationLevel])
.addField(`Создан`, `${days(message.channel.guild.createdAt)}`)
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setColor(color)
message.channel.send(embed);
}

exports.help = {
  name: 'server',
  aliases: ['server-info'],
  info: 'Информация о сервере',
  usage: '',
  group: 'util',
  ownerOnly: false,
  cooldown: 10
}
