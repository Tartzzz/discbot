const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return
    if(!args[0]) return embedMaker.command(message)

    let channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
    if(!channel) return embedMaker.command(message, "[channel]")

    query.select("guilds", {guildID: message.guild.id}, result => {
        if(!result) {
            query.insert("guilds", {guildID: message.guild.id, AChannel: channel.id})
            return done(channel.id)
        }
        query.update("guilds", {AChannel: channel.id}, {guildID: message.guild.id})
        return done(channel.id)
    })
    function done(channelID) {
        embedMaker.message(message, `I have set <#${channelID}> as announcement channel!`)
    }
}

module.exports.help = {
    name: "announcementchannel",
    description: "Set the stream announcement channel",
    usage: `${prefix}announcementchannel [channel]`,
    examples: [`${prefix}announcementchannel 432254551081615361`, `${prefix}announcementchannel #stream-alerts`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };