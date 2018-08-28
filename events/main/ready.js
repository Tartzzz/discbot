const query = require("../../modules/query.js")
const mixer = require("../../mixer.js")
module.exports = async (bot) => {
    console.log("Bot ready")

    let SchannelIDS = {}
    let DchannelIDS = {}
    bot.guilds.forEach(guild => {
        SchannelIDS[guild.id] = []
        DchannelIDS[guild.id] = {}
        query.select("streamers", {all: true, guildID: guild.id}, result => {
            if(!result) return
            for(i = 0; i < result.length; i++) {
                SchannelIDS[result[0].guildID].push(Math.floor(result[i].streamerID))
            }
            query.select("guilds", {guildID: guild.id}, result => {
                if(!result) return
                DchannelIDS[result.guildID].aChannel = result.AChannel
                let guildIDS = Object.keys(SchannelIDS)
                for(i = 0; i < guildIDS.length; i++) {
                    var channelID = SchannelIDS[guildIDS[i]]
                    var discordChannelID = `${DchannelIDS[guildIDS[i]].aChannel}`
                    var guildID = `${guildIDS[i]}`
    
                    for(i = 0; i < channelID.length; i++) {
                        let config = {channelID : channelID[i], discordChannelID, guildID, bot}
                        const mixerBot = new mixer(config)
                        mixerBot.start()
                        mixerBot.ready(() => {
                            console.log(`ready`)
                        })
                    }   
                }
            })
        })
    });
}