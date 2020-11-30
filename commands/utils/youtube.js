const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
const moment = require('moment');
const request = require('node-superfetch');
const { GOOGLE_KEY } = "AIzaSyDoKuBapeMa2wK1kT1IwxfhwaLzUROnjBo";

exports.run = async (bot, message, args) => {

try {
const { body } = await request.get('https://www.googleapis.com/youtube/v3/search').query({
					part: 'snippet',
					type: 'video',
					maxResults: 1,
					q: args[0],
					safeSearch: msg.channel.nsfw ? 'none' : 'strict',
					key: GOOGLE_KEY
				});
			if (!body.items.length) return message.channel.send('Не удалось найти никаких результатов.');
			const data = body.items[0];
			const embed = new MessageEmbed()
				.setColor(color)
				.setTitle(data.snippet.title)
				.setDescription(data.snippet.description)
				.setAuthor('YouTube', 'https://i.imgur.com/kKHJg9Q.png', 'https://www.youtube.com/')
				.setURL(`https://www.youtube.com/watch?v=${data.id.videoId}`)
				.setThumbnail(data.snippet.thumbnails.default ? data.snippet.thumbnails.default.url : null)
				.addField('Дата публикации', moment.utc(data.snippet.publishedAt).format('MM/DD/YYYY h:mm A'), true)
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Ошыб очка ${err.message}`);
		}
}

exports.help = {
  name: 'youtube',
  aliases: ['yt'],
  info: 'Поиск видео по YouTube.',
  usage: '',
  group: 'util',
  ownerOnly: false,
  cooldown: 10
}
