const Discord = require("discord.js")
const prefix = require("../../data/config.json").prefix
const embedMaker = require("../../modules/embed")
const query = require("../../modules/query")
const fetch = require('node-fetch');
module.exports.run = async (bot, message, args) => {
    let Title = ">Commands"
    let Description = `A list of available commands. For additional info on a command, type ${prefix}help <command>`
    let Cat1 = `>Stream Announcements`
    let Cat1Txt = "`addstreamer`, `removestreamer`, `announcementchannel`"
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