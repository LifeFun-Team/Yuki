const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
const { Aki, regions } = require('aki-api');
const { verify } = require('../../util/util');

exports.run = async (bot, message, args) => {
		const current = bot.games.get(message.channel.id);
		if (current) return message.reply(`Пожалуйсто подождите пока закончиться игра в \`${current.name}\``);
		try {
			const aki = new Aki('ru');
			let ans = null;
			let win = false;
			let timesGuessed = 0;
			let guessResetNum = 0;
			let wentBack = false;
			let forceGuess = false;
			const guessBlacklist = [];
			bot.games.set(message.channel.id, { name: message.channel.name });
			while (timesGuessed < 3) {
				if (guessResetNum > 0) guessResetNum--;
				if (ans === null) {
					await aki.start();
				} else if (wentBack) {
					wentBack = false;
				} else {try {await aki.step(ans);} catch {await aki.step(ans);}}
				if(!aki.answers || aki.currentStep >= 79) forceGuess = true;
				const answers = aki.answers.map(answer => answer.toLowerCase());
				answers.push('end');
				if(aki.currentStep > 0) answers.push('back');
const quiz = new MessageEmbed()
.setColor(color)
.setDescription(`${aki.currentStep + 1}. **${aki.question}** (${Math.round(Number.parseInt(aki.progress, 10))}%)\n[${aki.answers.join('/')}${aki.currentStep > 0 ? `/back` : ''}/end]`)
await message.say(quiz);
				const filter = res => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
				const msgs = await message.channel.awaitMessages(filter, {max: 1, time: 60000});
				if(!msgs.size) {win = 'time'; break;}
				const choice = msgs.first().content.toLowerCase();
				if(choice === 'end') {
					forceGuess = true;
				} else if (choice === 'back') {
					if (guessResetNum > 0) guessResetNum++;
					wentBack = true;
					await aki.back();
					continue;
				} else {ans = answers.indexOf(choice);}
				if((aki.progress >= 90 && !guessResetNum) || forceGuess) {
					timesGuessed++;
					guessResetNum += 10;
					await aki.win();
					const guess = aki.answers.filter(g => !guessBlacklist.includes(g.id))[0];
					if (!guess) {
						await message.say('Я не могу думать ни о ком.');
						win = true;
						break;
					}
					guessBlacklist.push(guess.id);
					const embed = new MessageEmbed()
            .setTitle("Это твой персонаж?")
						.setColor(color)
						.setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ''}\n\n**[Да/Нет]**`)
						.setImage(guess.absolute_picture_path || null)
					await message.say(embed);
					const verification = await verify(message.channel, message.author);
					if (verification === 0) {
						win = 'time';
						break;
					} else if (verification) {
						win = false;
						break;
					} else {
						const exMsg = timesGuessed >= 3 || forceGuess ? 'Я сдаюсь.' : 'Я продолжу задавать тебе вопросы';
						await message.say(`${exMsg}`);
						if (timesGuessed >= 3 || forceGuess) {
							win = true;
							break;
						}
					}
				}
			}
			bot.games.delete(message.channel.id);
			if(win === 'time') return message.say('Извините, но время вышло');
			if(win) return message.say('Браво, ты победил меня.');
			return message.say('Я люблю играть с тобой!');
		} catch (err) {
			bot.games.delete(message.channel.id);
		}
 };

exports.help = {
  name: 'akinator',
  aliases: ['aki'],
  info: 'Я узнаю загаданого тобой персонажа или личность',
  usage: '',
  group: 'game',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
