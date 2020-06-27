let Discord = require("discord.js");
module.exports = {
  days: function days(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    let years = Math.floor(days / 365);
    return days + (days == 1 ? " день" : " дней") + " назад";
  }
};
Discord.Message.prototype.say = function say(text) {
  let message = this;
  message.channel.send(text);
};