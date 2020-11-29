module.exports = (bot) => {
console.log(`${bot.user.tag} Запустилась!`);
bot.user.setActivity("u!help", { type: "WATCHING" });
  
setInterval(() => {
bot.user.setStatus('dnd')
setTimeout(() => {bot.user.setStatus('online')}, 10000)
}, 60000)
};
