const { MessageEmbed } = require("discord.js");
const { color } = require("../config.js");
const { days } = require("../util/functions.js");

module.exports = async (bot, guild) => {
  const leave = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setColor(color)
    .setDescription(`:outbox_tray: Я ушла с **${guild.name}** \`${guild.id}\``)
    .addField(`Основатель:`, `\`${guild.owner.user.tag}\` \`${guild.owner.user.id}\``)
    .addField(`Участников:`, guild.memberCount, true)
    .addField(`Создан:`, days(guild.createdAt), true)
    .setFooter(`Нас стало ${await bot.shard.fetchClientValues('guilds.cache.size').then(r => r.reduce((a,b) => a+b))} серверов!`);
    bot.rest.api.channels("636295513507102720").messages.post({data: {embed: leave.toJSON()}});
};
