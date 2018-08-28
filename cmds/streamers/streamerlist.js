const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
module.exports.run = async (bot, message, args) => {
    query.select("streamers", {all: true, guildID: message.guild.id}, result => {
        if(!result) {
            let text = "NaN"
            return msg(text)
        }
        let txt = []
        for(i = 0; i < result.length; i++) {
            txt.push(`${i + 1} ${result[i].streamerName}`)
        }
        let text = txt.join("\n")
    })

    function msg(text) {
        let name
        message.guild.name.toLowerCase().endsWith("'s") ? name = message.guild.name : name = message.guild.name + (message.guild.name.toLowerCase().endsWith("s") ? "'" : "'s")

        let embed = new Discord.RichEmbed()
            .setAuthor(`${name} Mixer Streamers`, bot.icons[message.guild.id])
            .setDescription(text)
            .setColor(bot.config.embed.embedColor)
            .setTimestamp()
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "streamerlist",
    description: "Get the list of streamers on this server",
    usage: `${prefix}streamerlist`,
    examples: [`${prefix}streamerlist`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };