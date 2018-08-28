const fetch = require('node-fetch');
const Carina = require('carina').Carina
const ws = require('ws');
const query = require("./modules/query.js")
Carina.WebSocket = ws;

const messageStart = (channelInfo) => {
    return `We're live playing ${channelInfo.type.game} on Mixer! Join the fun at <https://mixer.com/${channelInfo.token}>!`
};

const messageEnd = (channelInfo) => {
    return `Stream is over. <https://mixer.com/${channelInfo.token}>`
};


const defaultOptions = {
    notifyOnStart: true,
    messageStart: messageStart,
    notifyOnEnd: true,
    messageEnd: messageEnd
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
            query.select("streamers", {guildID: this.config.guildID, streamerID: this.config.channelID}, result => {
                if(!result) {
                    return this.ca.unsubscribe(`channel:${this.config.channelID}:update`)
                }
                
                if(data.online){
                    if(this.isLive) return
                    this.isLive = true
                    this.notifyOnStart();
                }else if(data.online === false) {
                    this.isLive = false
                }
            })
        });
    }

    notifyOnStart(){
        if(this.options.notifyOnStart){
            const message = this.options.messageStart(this.channelInfo);
            this.postToDiscord(message);
        }
    }
    notifyOnEnd(){
        if(this.options.notifyOnEnd){
            const message = this.options.messageEnd(this.channelInfo);
            this.postToDiscord(message);
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