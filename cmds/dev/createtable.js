const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    function crt() {
        let sql1 = "CREATE TABLE guilds (guildID VARCHAR(255), AChannel VARCHAR(255))"
        bot.con.query(sql1, function (err, result) {
          if (err) throw err;
          let embed = new Discord.RichEmbed()
            .addField("** **",`***:white_check_mark: Table 1 created*** ** **`)
            .setColor(bot.config.embed.embedColor)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          return message.channel.send(embed)
        });
    }
    function crt2() {
        let sql2 = "CREATE TABLE streamers (guildID VARCHAR(255), streamerName VARCHAR(255), streamerID VARCHAR(255))"
        bot.con.query(sql2, function (err, result) {
          if (err) throw err;
          let embed = new Discord.RichEmbed()
            .addField("** **",`***:white_check_mark: Table 2 created*** ** **`)
            .setColor(bot.config.embed.embedColor)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          return message.channel.send(embed)
        });
    }
    crt()
    crt2()
}

module.exports.help = {
    name: "createtable",
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cat: "dev"
  };