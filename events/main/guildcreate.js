const query = require("../../modules/query.js")
module.exports = async (bot, guild) => {
    query.insert("guilds", {guildID: guild.id, AChannel: undefined})
}