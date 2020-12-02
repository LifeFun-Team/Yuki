const { MessageEmbed, version } = require('discord.js');
const { color, invisible } = require('../../config.js');
const { days } = require("../../util/functions.js");

module.exports.run = async (bot, message, args) => {
  
const embed = new MessageEmbed();
const flags = {
DISCORD_EMPLOYEE: "",
DISCORD_PARTNER: "",
HYPESQUAD_EVENTS: "",
BUGHUNTER_LEVEL_1: "",
HOUSE_BRAVERY: "",
HOUSE_BRILLIANCE: "",
HOUSE_BALANCE: "",
EARLY_SUPPORTER: "",
TEAM_USER: "",
SYSTEM: "",
BUGHUNTER_LEVEL_2: "",
VERIFIED_BOT: "",
VERIFIED_DEVELOPER: ""};
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' '));
if(!args.join('')) member = message.member;

if(!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send(`У меня нету права \`Встраивать ссылки \``);
 if(message.guild.members.cache.has(member&&member.id)){

const activity = member.presence.activities.map(a => {
let str = "";
if(a.type === "CUSTOM_STATUS") {
 if(a.emoji && a.emoji.id && a.emoji.name && bot.guilds.cache.some(g => g.emojis.cache.has(a.emoji.id))) str += `${a.emoji} `;
else if(a.emoji && !a.emoji.id) str += `${a.emoji} `;
 if(a.state) str += a.state + " ";
return str;}

switch (a.type) {
case "PLAYING": str = "**Играет в** ";break;
 case "STREAMING": str = "**Стримит** ";break;                         
 case "LISTENING": str = "**Слушает** ";break;
case "WATCHING": str = "**Смотрит** ";break;}
  
  
if(a.name) str += `${a.name} `;
 if(a.details) str += "\n  " + a.details + " ";
 if(a.state) str += "\n  " + a.state + " ";
if(a.url) str += "\n  " + a.url;
return str;}).join("\n");
   
const status = {online: "<a:online:654748660134838283>", idle: "<a:idle:654748790309519370>", dnd: "<a:dnd:654748800828702773>"};
const devices = {desktop: 'Компьютер', web: 'Сайт', mobile: 'Телефон'};
   
   
const flag = member.user.flags.toArray();
let badge = " ";
if(flag.length != 0){
for(const f of flag){badge += `${flags[f]}`}};

let text = '';
if(member.presence.clientStatus){
for(let dev in member.presence.clientStatus){
let s = member.presence.clientStatus[dev]
text += `${status[s]} ${devices[dev]}\n`}};
   
if(member.presence.clientStatus == null){text = '<a:offline:654748811360600074> Оффлайн'};

const name = `**[${member.user.tag}](https://discord.com/users/${member.id}/)**`

embed.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
.setDescription(name + badge + "\n" + text + activity)
.setColor(color)
.addField(`ID:`, `${member.user.id}`)
.addField(`Зарегистрирован`, `${days(member.user.createdAt)}`)
.addField(`Присоединился к серверу`, `${days(member.joinedAt)}`)
.addField(`Роли[${member.roles.cache.size - 1}]`, message.guild.member(member).roles.cache.filter(r => r.id != message.guild.id).sort((a,b) => b.position - a.position).map(role => '<@&'+role.id+'>').join(' ').slice(0, 68) || 'Не имеет')
message.channel.send(embed);

  } else {
const member = await bot.users.fetch(args[0]).catch(() => null);
if(!member) return succ(`Неверный айди пользователя.`);

const flag = member.flags.toArray();
let badge = " ";
if(flag.length != 0){
for(const f of flag){badge += `${flags[f]}`}};

embed.setThumbnail(member.displayAvatarURL({dynamic: true}))
.setDescription(`**[${member.tag}](https://discord.com/users/${member.id}/)**` + "\n" + badge + "\n" + "<a:offline:654748811360600074> Нет на сервере.")
.setColor(invisible)
.addField(`ID:`, `${member.id}`)
.addField(`Зарегистрирован`, `${days(member.createdAt)}`)
message.channel.send(embed);
  }}

exports.help = {
  name: 'user',
  aliases: ['user-info'],
  info: 'Информация о пользователе',
  usage: '',
  group: 'util',
  ownerOnly: false,
  cooldown: 10
}
