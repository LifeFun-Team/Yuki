const { Client, Collection, MessageEmbed, WebhookClient } = require("discord.js");
const mongoose = require("mongoose");
const { readdir, readdirSync } = require("fs");
const bot = new Client({ disableMention: 'all' });
bot.options.ws.properties.$browser = "Discord Android";

//mongoose.connect("mongodb+srv://dope:duck3322@yukibd-d7dl4.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connection.on('connected',()=>{console.log("[MongoDB] Подключено!")});

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
const webhookClient = new WebhookClient('726133106309988412', 'mu0adEMW-0M_Qz_orGAsbzr4-iETdxQy8vkPwPDHmQvnJbeN70A3lAyHzisu2jbjCQTS');
let embed = new MessageEmbed()
.setColor("#d7342a")
.addField(`**Название:**`, `\`${error.name}\``, true)
.addField(`**Откуда:**`, `\`${error.path || 'xz'}\``, true)
.addField(`**Трейс:**`,  `\`\`\`js\n${error.stack.slice(0, 1000)}\`\`\``)
webhookClient.send(embed)
}) 

bot.login(process.env.token);
