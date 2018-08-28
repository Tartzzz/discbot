module.exports = async (bot, message) => {
    if(message.channel.type === "dm") return
    if(message.author.bot) return

    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    let args = messageArray.slice(1)
    let cmd = bot.commands.get(command.slice(bot.config.prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config.prefix.length)))

    message.guild.icon ? bot.icons[message.guild.id] = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp` : bot.icons[message.guild.id] = ""

    if(cmd) {
        if(message.content.startsWith(bot.config.prefix)) {
            if(cmd.conf.cat === "dev") {
                if(message.author.id !== process.env.DEV_ID) return
            }
            if(cmd.conf.enabled) return cmd.run(bot, message, args)
        }
    }
}