const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        message.author.id != "436228721033216009") ? return : {}
    }
    if(!args[0]) return embedMaker.command(message)

    let streamer = args[0]
    
    query.select("streamers", {guildID: message.guild.id, streamerName: streamer}, result => {
        if(!result) {
            return embedMaker.message(message, `${streamer} isn't on the list`)
        }
        query.delete("streamers", {guildID: message.guild.id, streamerName: streamer})
        return embedMaker.message(message, `Removed ${streamer} from the list`)
    })
}

module.exports.help = {
    name: "removestreamer",
    description: "Remove a streamer from the announcement list",
    usage: `${prefix}removestreamer [channel]`,
    examples: [`${prefix}removestreamer tartzzz`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };
