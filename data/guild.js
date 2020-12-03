const schema = mongoose.Schema({
    guildID: String,
    bl: { type: String, default: '0'},
});
module.exports = mongoose.model("Guild", schema)
