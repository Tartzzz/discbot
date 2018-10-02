const Discord = require("discord.js")
const config = require("../../data/config.json)
const embedMaker = require("../../modules/embed.js")
const request = require('request')
module.exports.run = async (bot, message, args) => {
    if(!args[0]) embedMaker.command(message)

    let emote = args[0]
    let emoteRegex = /(<:\w+:\d+>)/g

    if(emote.match(emoteRegex)) {
        let key = args[0].replace(/\D+/g, '')
        if(!key) return
        request(`https://cdn.discordapp.com/emojis/${key}.gif?v=1`, (error, response, body) => {
            if(error) throw error
            let embed = new Discord.RichEmbed()
            .setColor(config.embed.embedColor)
            response.body === "" ? imageURL = `https://cdn.discordapp.com/emojis/${key}.png?v=1` : imageURL = `https://cdn.discordapp.com/emojis/${key}.gif?v=1`
            embedMaker.image(message, imageURL)
        })
    }
}

module.exports.help = {
    name: "emoji",
    description: "Get the image of an emoji",
    usage: `emoji [emoji]`,
    examples: [`emoji :owo:`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
    cat: "Utility"
  };
