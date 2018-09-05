const fetch = require('node-fetch');
const Carina = require('carina').Carina
const ws = require('ws');
const query = require("./modules/query.js")
const Discord = require("discord.js")
const config = require("./data/config.json")
const request = require("request")
Carina.WebSocket = ws;

const messageStart = async (channelInfo, callback) => {
    let infourl = `https://mixer.com/api/v1/channels/${channelInfo.id}`;
    request(infourl, (error, response, body) => {
        if(error) return 

        let json = JSON.parse(body);

        if(json.error === "Not Found") return
        
        let dataJJ = json
        dataJJ.token.toLowerCase().endsWith("'s") ? Sname = dataJJ.token : Sname = dataJJ.token + (dataJJ.token.toLowerCase().endsWith("s") ? "'" : "'s")
        let bio = dataJJ.user.bio
        if(bio === "" || null) bio = `Click above to watch!`
        let embed = new Discord.RichEmbed()
            .setURL(`https://mixer.com/${dataJJ.token}`)
            .setTitle(`"${dataJJ.name}"`)
            .setAuthor(`${dataJJ.token} Is Live!`)
            .setDescription(bio)
            .addField("Streaming", dataJJ.type.name)
            .addField("Audience", dataJJ.audience, true)
            .addField("Mixer Level", dataJJ.user.level, true)
            .addField("Followers", dataJJ.numFollowers, true)
            .addField("Total Views", dataJJ.viewersTotal, true)
            .setFooter(`They seem cool`)
            .setColor(config.embed.embedColor)
            .setImage(dataJJ.type.backgroundUrl)
            .setThumbnail(dataJJ.user.avatarUrl)
            .setTimestamp()
        callback(embed)
    })

};

const defaultOptions = {
    notifyOnStart: true,
    messageStart: messageStart,
};

class MixerDiscordBot{
    constructor(config = {}){
        this.config = config;
        this.options = defaultOptions;
        this.readyFn = () => {};
    }

    ready(fn){
        this.readyFn = fn;
    }

    start() {
        this.ca = new Carina({ isBot: true }).open()
        this.loadInfo().then(this.subscribe());
    }

    loadInfo(){
        const infourl = `https://mixer.com/api/v1/channels/${this.config.channelID}`;
        return fetch(infourl).then((data) => {
            return data.json()
        }).then((data) => {
            this.channelInfo = data;
            this.readyFn();
        });
    }
    subscribe() {
        this.ca.subscribe(`channel:${this.config.channelID}:update`, data => {
            console.log(data)
            query.select("streamers", {guildID: this.config.guildID, streamerID: this.config.channelID}, result => {
                if(!result) {
                    return this.ca.unsubscribe(`channel:${this.config.channelID}:update`)
                }
                if(data.online){
                    if(this.isLive) return
                    this.isLive = true
                    this.notifyOnStart();
                }else if(data.online === false) {
                    setTimeout(() => {
                        this.isLive = false
                    }, 1200000)

                }
            })
        });
    }

    notifyOnStart(){
        if(this.options.notifyOnStart){
            this.options.messageStart(this.channelInfo, message => {
                this.postToDiscord(message);
            })
        }
    }
    postToDiscord(message){
        let bot = this.config.bot
        let config = this.config
        let guild = bot.guilds.get(config.guildID)
        let channel = guild.channels.get(config.discordChannelID)

        channel.send(message)
    }
}
module.exports = MixerDiscordBot;
