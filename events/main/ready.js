const query = require("../../modules/query.js")
const mixer = require("../../mixer.js")
module.exports = async (bot) => {
    console.log("Bot ready")
    bot.user.setActivity("%help")

    let SchannelIDS = {}
    let DchannelIDS = {}
    query.select("guilds", {"all": true}, resultG => {
        if(!resultG) return
        
        for(i = 0; i < resultG.length; i++) {
            guildID = resultG[i].guildID
            AChannel = resultG[i].AChannel
            SchannelIDS[guildID] = []
            DchannelIDS[guildID] = {}
            DchannelIDS[guildID].aChannel = AChannel
            console.log(DchannelIDS)
            query.select("streamers", {"all": true, guildID: guildID}, result => {
                if(!result) return
                console.log(result)

                for(i = 0; i < result.length; i++) {
                    SchannelIDS[guildID].push(Math.floor(result[i].streamerID))
                }

                let guildIDS = Object.keys(SchannelIDS)
                console.log(guildIDS)
                for(i = 0; i < guildIDS.length; i++) {
                    var channelID = SchannelIDS[guildIDS[i]]
                    var discordChannelID = `${DchannelIDS[guildIDS[i]].aChannel}`
                    var guildID = `${guildIDS[i]}`
        
                    for(i = 0; i < channelID.length; i++) {
                        console.log(channelID)
                        let config = {channelID : channelID[i], discordChannelID: discordChannelID, guildID: guildID, bot: bot}
                        console.log(config)
                        const mixerBot = new mixer(config)
                        mixerBot.start()
                        mixerBot.ready(() => {
                            console.log(`ready`)
                        })
                    }   
                }
            })
        }
    })
}
