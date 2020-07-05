const { ShardingManager } = require("discord.js");
const shardMgr = new ShardingManager("./bot.js", { token: process.env.token, totalShards: "auto", respawn: true });

shardMgr.spawn("auto" === "auto" ? shardMgr.totalShards : "auto", 7500);
shardMgr.on("shardCreate", shard => console.log(`#${shard.id} осколок был запущен`));
