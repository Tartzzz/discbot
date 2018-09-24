const query = require("../../modules/query.js")
const mixer = require("../../mixer.js")
module.exports = async (bot) => {
    console.log("Bot ready")
    bot.user.setActivity("%help")

    // let SchannelIDS = {}
    // let DchannelIDS = {}
    // query.select("guilds", {"all": true}, resultG => {
    //     if(!resultG) return
        
    //     for(i = 0; i < resultG.length; i++) {
    //         console.log(resultG)
    //         guildID = resultG[i].guildID
    //         AChannel = resultG[i].AChannel
    //         SchannelIDS[guildID] = []
    //         DchannelIDS[guildID] = {}
    //         DchannelIDS[guildID].aChannel = AChannel
    //         query.select("streamers", {"all": true, guildID: guildID}, result => {
    //             if(!result) return
    //             for(i = 0; i < result.length; i++) {
    //                 SchannelIDS[result[i].guildID].push(Math.floor(result[i].streamerID))
    //             }

    //             let guildIDS = Object.keys(SchannelIDS)
    //             console.log(guildIDS)
    //             for(i = 0; i < guildIDS.length; i++) {
    //                 var channelID = SchannelIDS[guildIDS[i]]
    //                 var discordChannelID = `${DchannelIDS[guildIDS[i]].aChannel}`
    //                 var guildID = `${guildIDS[i]}`
        
    //                 for(i = 0; i < channelID.length; i++) {
    //                     let config = {channelID : channelID[i], discordChannelID: discordChannelID, guildID: guildID, bot: bot}
    //                     const mixerBot = new mixer(config)
    //                     mixerBot.start()
    //                     mixerBot.ready(() => {
    //                         console.log(`ready`)
    //                     })
    //                 }   
    //             }
    //         })
    //     }
    // })
    function getAnnouncementChannel(guildID, callback) {
        query.select("guilds", {"all": true, guildID: guildID}, resultG => {
            callback(resultG[0].AChannel)
        })
    }
    function getGuildIDs(callback) {
        query.select("guilds", {"all": true}, resultG => {
            let IDs = []
            for(i = 0; i < resultG.length; i++) {
                IDs.push(resultG[i].guildID)
            }
            callback(IDs)
        })
    }
    function getStreamers(guildID, callback) {
        query.select("streamers", {"all": true, guildID: guildID}, result => {
            callback(result)
        })
    }

    getGuildIDs(guildIDs => {
        guildIDs.forEach(guildID => {
            console.log(guildID)
            getAnnouncementChannel(guildID, aChannelID => {
                let annoucnementChannel = aChannelID
                getStreamers(guildID, streamers => {
                    let streamerIDs = []
                    for(j = 0; j < streamers.length; j++) {
                        streamerIDs.push(Math.floor(streamers[j].streamerID))
                    }
                    console.log(streamerIDs)
                    for(i = 0; i < streamerIDs.length; i++) {
                        console.log(streamerIDs[i])
                        let config = {channelID : streamerIDs[i], discordChannelID: annoucnementChannel, guildID: guildID, bot: bot}
                        const mixerBot = new mixer(config)
                        mixerBot.start()
                        mixerBot.ready(() => {
                            console.log(`ready ${guildID}`)
                        })
                    }
                })
            })
        })
    })

}
