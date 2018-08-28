const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const request = require("request")
module.exports.run = async (bot, message, args) => {
    query.select("streamers", {all: true, guildID: message.guild.id}, result => {
        if(!result) {
            let text = "NaN"
            return msg(text)
        }
        let txt = []
        for(i = 0; i < result.length; i++) {
            var infourl = `https://mixer.com/api/v1/channels/${result[i].streamerName}`
            var res = result[i]
            let num = i
            request(infourl, (error, response, body) => {
                if(error) return message.channel.send("slight error, whoops")
        
                let json = JSON.parse(body);
                
                json.online === true ? extension = `:red_circle: - ${res.viewersCurrent} Viewers` : extension = ":black_circle: "
                txt.push(`\`#${num + 1}\` **${res.streamerName}** ${extension}`)
                let text = txt.join("\n")
                msg(text)
            })
        }
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