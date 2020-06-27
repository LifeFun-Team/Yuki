const SDC = require("@megavasiliy007/sdc-api");
const sdc = new SDC("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODE2MjExMDcxMDY3NzUyNCIsInBlcm1zIjowLCJpYXQiOjE1ODY2NzU0NDR9.ZBKs2yJlXhTlWD5SZMmar1gplx703AKxWBomhMp5oFQ");
module.exports = (bot) => {
console.log(`${bot.user.tag} Запустилась!`);
const Music = require('../structures/Music.js');
bot.music = new Music(bot);
bot.user.setActivity("u!help", { type: "WATCHING" });
sdc.setAutoPost(bot);
  
setInterval(() => {
bot.user.setStatus('dnd')
setTimeout(() => {bot.user.setStatus('online')}, 10000)
}, 60000)
};
