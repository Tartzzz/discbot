const Discord = require("discord.js")
const config = require("../data/config.json")
const bot = require("../bot.js")
module.exports = {
    message: (message, text, options, callback) => {
        options = options || {}
        let embed = new Discord.RichEmbed()
            .setColor(config.embed.embedColor)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`${text}`)

        if(options.color) embed.setColor(options.color)
        if(options.title) embed.setTitle(options.title)
        if(options.author) {
            if(options.aIcon) {
                embed.setAuthor(options.author, options.aIcon)
            }else {
                embed.setAuthor(options.author)
            }
            
        }
        if(options.footer) embed.setFooter(options.footer)
        if(options.edit) {
            console.log("3")
            message.edit(embed).then(m => {
                if(callback) return callback(m)
            })
        }else {
            message.channel.send(embed).then(m => {
                if(callback) return callback(m)
             })            
        }

    },
    image: (message, link) => {
        let embed = new Discord.RichEmbed()
            .setColor(config.embed.embedColor)
            .setImage(link)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        return message.channel.send(embed)
    },
    embed: (message, text, options) => {
        options = options || {}
        let embed = new Discord.RichEmbed()
            .setColor(config.embed.embedColor)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`${text}`)
            
        if(options.color) embed.setColor(options.color)
        return embed
    },
    command: (message, param) => {
        let messageArray = message.content.split(" ")
        let commandName = messageArray[0].slice(config.prefix.length)
        let command = bot.commands.get(commandName)
        let name = command.help.name
        let description = command.help.description
        let usage = command.help.usage
        let examples = command.help.examples.join("\n    ")
        command.help.examples.length > 0 ? exampleText = "Examples" : exampleText = "Example"
        
        if(param) {
            if(param.startsWith("[" || "(") && param.endsWith("]"|| ")")) {
                let embed = new Discord.RichEmbed()
                    .setColor(config.embed.embedColor)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                    .setDescription(`Invalid ${param} argument given.\n\n**Usage:**\n    ${command.help.usage}`)
                message.channel.send(embed)
            }else {
                let embed = new Discord.RichEmbed()
                    .setColor(config.embed.embedColor)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                    .setTitle(`Command: ${config.prefix}${name}`)
                    .setDescription(`**Description:** ${description}\n**Usage:** ${usage}\n**${exampleText}:**\n    ${examples}\n\n${param}`)
                message.channel.send(embed)
            }
        }else {
            let embed = new Discord.RichEmbed()
                .setColor(config.embed.embedColor)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                .setTitle(`Command: ${config.prefix}${name}`)
                .setDescription(`**Description:** ${description}\n**Usage:** ${usage}\n**${exampleText}:**\n    ${examples}`)
            message.channel.send(embed)
        }
    },
}