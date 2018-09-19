const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    try {
        const code = args.join(" ")
        let evaled = eval(code)

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled)

        message.channel.send(evaled, {code:"xl"});
    } catch (err) {
        message.channel.send(`Error fam`);
      }
}

module.exports.help = {
    name: "eval",
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cat: "dev"
  };
