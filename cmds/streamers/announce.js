const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
const request = require("request")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        if(message.author.id === process.env.DEV_ID) {
        }else {
            return
        }
    }

    let streamer = args.join(" ")
    let infourl = `https://mixer.com/api/v1/channels/${streamer}`;
    request(infourl, (error, response, body) => {
        if(error) return 
    
        let json = JSON.parse(body);
    
        if(json.error === "Not Found") return embedMaker.message(message, "Couldn't find that streamer")
        
        let dataJJ = json

        if(!dataJJ.online) return embedMaker.message(message, "They are offline")
        dataJJ.token.toLowerCase().endsWith("'s") ? Sname = dataJJ.token : Sname = dataJJ.token + (dataJJ.token.toLowerCase().endsWith("s") ? "'" : "'s")
    
        let embed = new Discord.RichEmbed()
            .setURL(`https://mixer.com/${dataJJ.token}`)
            .setTitle(`"${dataJJ.name}"`)
            .setAuthor(`${dataJJ.token} Is Live!`)
            .setDescription(dataJJ.user.bio)
            .addField("Streaming", dataJJ.type.name)
            .addField("Audience", dataJJ.audience, true)
            .addField("Mixer Level", dataJJ.user.level, true)
            .addField("Followers", dataJJ.numFollowers, true)
            .addField("Total Views", dataJJ.viewersTotal, true)
            .setFooter(`This is a manual announcement`)
            .setColor(bot.config.embed.embedColor)
            .setImage(dataJJ.type.backgroundUrl)
            .setThumbnail(dataJJ.user.avatarUrl)
            .setTimestamp()
        query.select("guilds", {guildID: message.guild.id}, result => {
            if(!result) return
            let channel = message.guild.channels.get(result.AChannel)
            channel.send(embed)
        })
    })
}

module.exports.help = {
    name: "announce",
    description: "announce a streamer if the automatic one missed it",
    usage: `${prefix}announce [channel]`,
    examples: [`${prefix}announce tartzzz`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };