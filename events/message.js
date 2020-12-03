const { owners, prefix} = require('../config.js');
const cooldownCache = new Set();
module.exports = async (bot, message) => {
  
  let data = await guild.findOne({guildID:message.guild.id});
  if(!data){let a = new guild({guildID: message.guild.id}); a.save()}
  
  if(!message.guild||message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = bot.commands.get(command) || bot.commands.find(c => c.help.aliases.includes(command));
  if(!cmd) return;
  if(cmd.help.ownerOnly && !owners.includes(message.author.id)) return;
  if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
  if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.say("У меня нету права `Встраивать ссылки`");
  if(!message.channel.permissionsFor(message.guild.me).has('USE_EXTERNAL_EMOJIS')) return message.say("У меня нету права `Использовать внешние эмодзи`");
  if(!message.channel.permissionsFor(message.guild.me).has('ADD_REACTIONS')) return message.say("У меня нету права `Добавлять реакции`");

  const limitFlag = `${message.author.id}-${cmd.help.name}`;
  const ddos = `\`${message.guild.name}|${message.guild.id}${message.author.tag}|${message.author.id}\``;
  if(cooldownCache.has(limitFlag)) {return message.react('⏱️'), bot.rest.api.channels("719241427292520509").messages.post({data: {content: ddos}});}
  
  cooldownCache.add(limitFlag);
  setTimeout(()=>{cooldownCache.delete(limitFlag)}, cmd.help.cooldown*1000);

    await cmd.run(bot, message, args);
};
