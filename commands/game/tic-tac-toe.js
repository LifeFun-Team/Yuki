const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.js');
const { verify, verifyWin } = require('../../util/util');
exports.run = async (bot, message, args) => {
    let opponent = message.guild.member(message.mentions.users.first());
    if(!args[0]) return message.say("Вы не указали противника");
    if(!opponent) return message.say('Пользователь не найден');
    if(opponent.id === message.author.id) return message.say("Вы не можете играть сам с собой.");
    if(opponent.user.bot) return message.say("Вы не можете поиграть с ботом.");
    if(!opponent) return message.say("Пользователь не найден");
		const current = bot.games.get(message.channel.id);
		if(current) return message.reply(`Пожалуйсто подождите пока закончиться игра в \`${current.name}\``);
		bot.games.set(message.channel.id, { name: message.channel.name });
		try {
			await message.say(`${opponent}, хотите поиграть в крестики нолики?`);
			const verification = await verify(message.channel, opponent);
			if (!verification) {
				bot.games.delete(message.channel.id);
				return message.say(`Похоже ${opponent} отказался от участвия в игре`);
			}
			const sides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			let lastTurnTimeout = false;
			while (!winner && taken.length < 9) {
				const user = userTurn ? message.author : opponent;
        const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${user} ваш ход! Введите \`номер\` или \`end\` для отмены.\`\`\`${sides[0]} | ${sides[1]} | ${sides[2]}\n—————————\n${sides[3]} | ${sides[4]} | ${sides[5]}\n—————————\n${sides[6]} | ${sides[7]} | ${sides[8]}\`\`\``)

				const sign = userTurn ? 'X' : 'O';
				await message.say(embed);
				const filter = res => {
					if (res.author.id !== user.id) return false;
					const choice = res.content;
					if(choice.toLowerCase() === 'end') return true;
					return sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await message.say('Игра закончилась из-за бездействия.');
         bot.games.delete(message.channel.id);
				}
				const choice = turn.first().content;
				if(choice.toLowerCase() === 'end') {
					winner = userTurn ? opponent : message.author;
					break;
				}
				sides[Number.parseInt(choice, 10) - 1] = sign;
				taken.push(choice);
				if (verifyWin(sides)) winner = userTurn ? message.author : opponent;
				if (lastTurnTimeout) lastTurnTimeout = false;
				userTurn = !userTurn;
			}
			bot.games.delete(message.channel.id);
			return message.say(winner ? `Победил(а) ${winner}!` : 'Ничья ¯\\_(ツ)_/¯');
		} catch (err) {
			bot.games.delete(message.channel.id);
		}
}
exports.help = {
  name: 'tic-tac-toe',
  aliases: ['ttt'],
  info: 'Играть в крестики нолики',
  usage: '@Пользователь',
  group: 'game',
  ownerOnly: false,
  sponsor: false,
  cooldown: 10
}
