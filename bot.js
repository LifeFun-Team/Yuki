const { Client, Collection, MessageEmbed, WebhookClient } = require("discord.js");
const mongoose = require("mongoose");
const { readdir, readdirSync } = require("fs");
const bot = new Client({ allowedMentions: {parse: []} });
bot.options.ws.properties.$browser = "Discord Android";

bot.games = new Collection();

// Загрузка ивентов
readdirSync("./events/").filter(file => file.endsWith(".js")).forEach(file => {
bot.on(file.split('.')[0], require(`./events/${file}`).bind(null, bot));
});

// Загрузка команд
bot.commands = new Collection();
		readdir(`./commands/`, (err, files) => {
			if (err) console.error(err)
			files.forEach(category => {
				readdir(`./commands/${category}`, (err, cmd) => {
					cmd.forEach(async cmd => {
						const command = require(`./commands/${category}/${cmd}`);
						bot.commands.set(command.help.name, command)
					})
				})
			})
		})

process.on('unhandledRejection', error => {
const webhookClient = new WebhookClient('webhookId', 'webhookToken');
let embed = new MessageEmbed()
.setColor("#d7342a")
.addField(`**Название:**`, `\`${error.name}\``, true)
.addField(`**Откуда:**`, `\`${error.path || 'Неизвестно'}\``, true)
.addField(`**Трейс:**`,  `\`\`\`js\n${error.stack.slice(0, 1000)}\`\`\``)
webhookClient.send(embed)
}) 

bot.login(process.env.token);
