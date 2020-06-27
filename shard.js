const { ShardingManager } = require("discord.js");
const shardMgr = new ShardingManager("./bot.js", { token: process.env.token, totalShards: 2, respawn: true });

shardMgr.spawn(2 === 2 ? shardMgr.totalShards : 2, 7500);
shardMgr.on("shardCreate", shard => console.log(`#${shard.id} осколок был запущен`));
