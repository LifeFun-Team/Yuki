module.exports = async (bot, oldMessage, newMessage) => {
if(oldMessage.content === newMessage.content) return
bot.emit("message", newMessage)
}
