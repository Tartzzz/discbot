const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
const request = require("request")
const mixer = require("../../mixer.js")
module.exports.run = async (bot, message, args) => {
    console.log("t")
    if(!args[0]) return embedMaker.command(message)

    let streamer = args[0]
    
    // const infourl = `https://mixer.com/api/v1/channels/${streamer}`;
    // return fetch(infourl).then((data) => {
    //     data.json().then(dataJ => {
    //         console.log()
    //         console.log(dataJ)
    //         if(dataJ.error) return embedMaker.message(message, "I couldn't find a channel with that name.")
    //         let object = {}
    //         object.data = dataJ
    //         qstreamers(object)
    //     })
    // })

    const infourl = `https://mixer.com/api/v1/channels/${streamer}`;
    request(infourl, (error, response, body) => {
        if(error) return message.channel.send("slight error, whoops")

        let json = JSON.parse(body);
        let object = {}
        object.data = json
        qstreamers(object)
    })
    function qstreamers(object) {
        let dataJ = object.data
        query.select("streamers", {guildID: message.guild.id, streamerID: dataJ.id}, result => {
            if(!result) {
                console.log(message.guild.id, streamer, dataJ.id)
                query.insert("streamers", {guildID: message.guild.id, streamerName: streamer, streamerID: dataJ.id})
                return qguilds(object)
            }
            return embedMaker.message(message, "That streamer is already on the list.")
        })
    }

    function qguilds(object) {
        let dataJ = object.data
        query.select("guilds", {guildID: message.guild.id}, guild => {
            if(!guild) {
                return query.insert("guilds", {guildID: message.guild.id, AChannel: "undefined"}).then(() =>{
                    return embedMaker.message(message, "You need to set announcement channel before you can add streamers")
                })
            }
            var channelID = dataJ.id
            var discordChannelID = guild.AChannel
            var guildID = message.guild.id
            let config = {channelID, discordChannelID, guildID, bot}
            const mixerBot = new mixer(config)
            mixerBot.start()
            mixerBot.ready(() => {
                embedMaker.message(message, `Added ${streamer} to the announcement list.`, {footer: `channelID: ${dataJ.id}`})
                return console.log(`ready - ${channelID}`)
            })
        })
    }
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