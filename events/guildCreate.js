const { MessageEmbed } = require("discord.js");
const { color } = require("../config.js");
const { days } = require("../util/functions.js");

module.exports = async (bot, guild) => {
    const join = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setColor(color)
    .setDescription(`:inbox_tray: Я пришла на **${guild.name}** \`${guild.id}\``)
    .addField(`Участников:`, guild.memberCount, true)
    .addField(`Создан:`, days(guild.createdAt), true)
    if(guild.me.hasPermission("MANAGE_GUILD")){
    let links = await guild.fetchInvites(); links = links.map(i => `[${i.code}](https://discord.gg/${i.code})`).slice(0, 60).join(' ');
    join.addField(`Ссылки:`, links || "нету")
}
  join.setFooter(`Нас стало ${await bot.shard.fetchClientValues('guilds.cache.size').then(r => r.reduce((a,b) => a+b))} серверов!`)
  bot.rest.api.channels("636291808225132545").messages.post({data: {embed: join.toJSON()}});
};
