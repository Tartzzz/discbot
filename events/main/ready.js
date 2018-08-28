const query = require("../../modules/query.js")
module.exports = async (bot) => {
    console.log("Bot ready")
    function crt2() {
        let sql2 = "CREATE TABLE streamers (guildID VARCHAR(255), streamerName VARCHAR(255), streamerID VARCHAR(255))"
        bot.con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log("done")
        });
    }
    crt2()
    let SchannelIDS = {}
    let DchannelIDS = {}
    bot.guilds.forEach(guild => {
        SchannelIDS[guild.id] = []
        DchannelIDS[guild.id] = {}
        query.select("streamers", {all: true, guildID: guild.id}, result => {
            if(!result) return
            for(i = 0; i < result.length; i++) {
                SchannelIDS[result.guildID].push(Math.floor(result[i].streamerID))
            }
            query.select("guilds", {guildID: guild.id}, result => {
                if(!result) return
                DchannelIDS[result.guildID].aChannel = result.AChannel
                
            })
            let guildIDS = Object.keys(SchannelIDS)
            for(i = 0; i < guildIDS.length; i++) {
                var channelID = SchannelIDS[guildIDS[i]]
                var discordChannelID = DchannelIDS[guildIDS].aChannel
                var guildID = guildIDS.length

                for(i = 0; i < channelID.length; i++) {
                    let config = {channelID : channelID[i], discordChannelID, guildID, bot}
                    const mixerBot = new mixer(config)
                    mixerBot.start()
                    mixerBot.ready(() => {
                        console.log(`ready - ${channelID[i]}`)
                    })
                }   
            }
            
        })
    });
}