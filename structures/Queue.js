const { ms, s, m, h } = require("./time.js");

module.exports = class Queue {
    constructor(bot, data = {}) {
        this.bot = bot;
        this.textChannel = data.textChannel;
        this.voiceChannel = data.voiceChannel;
        this.player = null;
        this.songs = [];
        this.volume = 50;
        this.playing = true;
        this.loop = false;
    }

    setPlayer(player) {
        this.player = player;
    }

    async pause() {
        if (!this.playing) return false;
        await this.player.pause(true);
        this.playing = false;
        return true;
    }

    async resume() {
        if (this.playing) return false;
        await this.player.pause(false);
        this.playing = true;
        return true;
    }

    async skip() {
        return await this.player.stop();
    }

    async setVolume(value) {
        if (!value || isNaN(value)) return false;
        await this.player.volume(value);
        this.volume = parseInt(value);
        return true;
    }

    async destroy() {
        this.bot.music.queue.delete(this.textChannel.guild.id);
        await this.bot.music.manager.leave(this.textChannel.guild.id);
    }

    songProgress(message, count = 20) {
        const res = new Array(count).fill("▬");
        res[Math.floor((this.bot.music.queue.get(message.guild.id).player.state.position / this.bot.music.queue.get(message.guild.id).songs[0].info.length) * count)] = "🔘"
        return res.join("")
    }

    format(s, m, h) {
        if (isNaN(s) || isNaN(m) || isNaN(h)) return "00:00:00"
        s = s < 10 ? `0${s}` : s
        m = m < 10 ? `0${m}` : m
        h = h < 10 ? `0${h}` : h
        return `${h}:${m}:${s}`
    }

    duration(time) {
        const [hour, min, sec] = ms.to(h, m, s)(time)
        return this.format(sec, min, hour)
    }

    percent(message) {
        return ((this.bot.music.queue.get(message.guild.id).player.state.position / this.bot.music.queue.get(message.guild.id).songs[0].info.length) * 100).toFixed(1)
    }

    seek (s, m = 0, h = 0) {
        if (isNaN(s) || isNaN(m) || isNaN(h)) return
        if (!this.songs[0].info.isSeekable) return
        const time = (s * 1000) + (m * 60 * 1000) + (h * 60 * 60 * 1000)
        this.player.seek(time)
        return this.format(s, m, h)
    }
}
