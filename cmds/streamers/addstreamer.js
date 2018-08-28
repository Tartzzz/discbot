const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)

    let streamer = args[0]
    
    const infourl = `https://mixer.com/api/v1/channels/${streamer}`;
    return fetch(infourl).then((data) => {
        let dataJ = data.json()

        if(dataJ.error) return embedMaker.message(message, "I couldn't find a channel with that name.")

        query.select("streamers", {guildID: message.guild.id, streamerID: dataJ.id}, result => {
            if(!result) {
                query.insert("streamers", {guildID: message.guild.id, streamerName: streamer, streamerID: dataJ.id})
                query.select("guilds", {guildID: message.guild.id}, guild => {
                    var channelID = dataJ.id
                    var discordChannelID = guild.AChannel
                    var guildID = message.guild.id
                    let config = {channelID, discordChannelID, guildID, bot}
                    const mixerBot = new mixer(config)
                    mixerBot.start()
                    mixerBot.ready(() => {
                        console.log(`ready - ${channelID}`)
                    })
                })

                return embedMaker.message(message, `Added ${streamer} to the announcement list.`, {footer: `channelID: ${dataJ.id}`})
            }
            return embedMaker.message(message, "That streamer is already on the list.")
        })
    })
}

module.exports.help = {
    name: "addstreamer",
    description: "Add a streamer to the announcement list",
    usage: `${prefix}addstreamer [channel]`,
    examples: [`${prefix}addstreamer tartzzz`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };