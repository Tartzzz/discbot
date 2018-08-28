const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
module.exports.run = async (bot, message, args) => {
    let commands = [`announcementchannel`, `addstreamer`, `removestreamer`, `streamerlist`, `help`]
    if(args[0]) {
        if(!commands.indexOf(args[0])) return help()

        let cmd = bot.commands.get(args[0])

        let embed = new Discord.RichEmbed()
            .setColor(config.embed.embedColor)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setTitle(`Command: ${config.prefix}${name}`)
            .setDescription(`**Description:** ${description}\n**Usage:** ${usage}\n**${exampleText}:**\n    ${examples}`)
        message.channel.send(embed)
    }
    function help() {
        let Title = ">Commands"
        let Description = `A list of available commands. For additional info on a command, type ${prefix}help <command>`
        let Cat1 = `>Stream Announcements`
        let Cat1Txt = "`announcementchannel`, `addstreamer`, `removestreamer`, `streamerlist`"
        let Cat2 = `>Utility`
        let Cat2Txt = "`help`"

        let embed = new Discord.RichEmbed()
            .setTitle(Title)
            .setDescription(Description)
            .addField(Cat1, Cat1Txt)
            .addField(Cat2, Cat2Txt)
            .setColor(bot.config.embed.embedColor)

        message.channel.send(embed)
    }

}

module.exports.help = {
    name: "help",
    description: "Get help",
    usage: `${prefix}help (command)`,
    examples: [`${prefix}help`, `${prefix}help streamerlist`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
  };