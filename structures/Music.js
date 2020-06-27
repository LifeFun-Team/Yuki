const { Collection, MessageEmbed } = require("discord.js");
const { Manager } = require("@lavacord/discord.js");
const { Rest } = require("lavacord");
const Queue = require("./Queue");

module.exports = class MusicMgr { 
constructor(bot) { 
this.bot = bot;
 this.manager = new Manager(bot, [{ id: "1", host: process.env.host, port: process.env.port, password: process.env.password }], {
  user: bot.user.id,
  shards: bot.shard ? bot.shard.count : 2
 });
this.manager.connect().then(() => console.log("[LAVALINK] Подключен!"));
 this.queue = new Collection();
    }

async handleVideo(message, voiceChannel, song) {
 const serverQueue = this.queue.get(message.guild.id);
  song.requestedBy = message.author;

if(!serverQueue) {
 const queue = new Queue(this.bot, { textChannel: message.channel, voiceChannel });
  queue.songs.push(song);
   this.queue.set(message.guild.id, queue);
try {
 const player = await this.manager.join({ channel: voiceChannel.id, guild: message.guild.id, node: "1" });
  queue.setPlayer(player);
   this.play(message.guild, song);
  } catch(err) {
  console.error;
    this.queue.delete(message.guild.id);
     this.manager.leave(message.guild.id);
      message.reply(new MessageEmbed().setTitle("ОшибОчка!").setDescription(`\`\`\`js\n${err}\n\`\`\``).setColor("#2F3136"));
  }
    } else {
serverQueue.songs.push(song);
 message.channel.send(new MessageEmbed().setTitle("Добавлено в очередь!").setDescription(`[__${song.info.title}__](${song.info.uri}) [${song.requestedBy}]`).setImage(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`).setColor("#2F3136"));
  }
    }

play(guild, song) {
 const serverQueue = this.queue.get(guild.id);
  if(!song) {
    serverQueue.textChannel.send(new MessageEmbed().setDescription("Больше нечего играть! 👋").setColor("#2F3136"));
     this.manager.leave(guild.id);
      this.queue.delete(guild.id);
  } else {
serverQueue.player.play(song.track);
 serverQueue.player.once("error", console.error).once("end", data => {
if(data.reason === 'Disconnected.') return console.log("successfully");
if(data.reason === "REPLACED") return;
 const shiffed = serverQueue.songs.shift();
  if(serverQueue.loop) { serverQueue.songs.push(shiffed); }

this.play(guild, serverQueue.songs[0]);
  });

serverQueue.player.volume(serverQueue.volume);
 serverQueue.textChannel.send(new MessageEmbed().setColor("#2F3136").setTitle("Начинаю играть!").setDescription(`[__${song.info.title}__](${song.info.uri}) [${song.requestedBy}]`).setImage(`https://img.youtube.com/vi/${song.info.identifier}/maxresdefault.jpg`));
 }
   }
  
async getSongs(query) {
 const node = this.manager.nodes.get("1");
  const result = await Rest.load(node, query);

 switch(result.loadType) {
   case "TRACK_LOADED": { return result.tracks }
    case "SEARCH_RESULT": { return result.tracks }
        }
    };
};
