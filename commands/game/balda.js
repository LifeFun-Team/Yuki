const words = require('../../json/balda')

exports.run = async (bot, message, args) => {
      
		this.playing = new Set();

	async run(msg) { 
		if (this.playing.has(msg.channel.id)) return msg.reply('Только одна игра может происходить в канале!');
		this.playing.add(msg.channel.id);
		try {
			const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill('||░||');
			while (word.length !== confirmation.length && points < 6) {
        await msg.say(stripIndents`
					${displayText === null ? 'Мы начинаем!' : displayText ? '👍 Хорошая работа! 👍' : '❌ Нету! ❌'}
					${display.join(' ')}. 
          Какую букву вы выбираете?
					**Отсутствующие буквы:** ${incorrect.join(', ') || '-'}
          \`\`\`
					_______
					|     |
					|     ${points > 0 ? '😵' : ''}
					|    ${points > 2 ? '┌' : ' '}${points > 1 ? '()' : ''}${points > 3 ? '┐' : ''}
					|     ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
					|
          |
          \`\`\`
        `);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === msg.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!guess.size) {
					await msg.say('⌛ Извините! Время вышло! ⌛');
					break;
				}
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === word) {
					guessed = true;
					break;
				} else if (word.includes(choice)) {
					displayText = true;
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
						confirmation.push(word.charAt(i));
						display[i] = word.charAt(i);
					}
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				}
			}
			this.playing.delete(msg.channel.id);
			if (word.length === confirmation.length || guessed) return msg.say(`🎉 Вы победили! Это было слово: **${word}**! 🎉`);
			return msg.say(`🤷 Очень плохо... Это было слово: **${word}**... 🤷`);
		} catch (err) {
			this.playing.delete(msg.channel.id);
			console.log(err.stack);
		}

	}
};

exports.help = {
  name: 'balda',
  aliases: [],
  info: 'Угадайте слово, что бы человечик не был повешен.',
  usage: '',
  group: 'game',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
