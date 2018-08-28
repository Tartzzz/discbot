const Discord = require("discord.js")
const bot = new Discord.Client({disableEveryone: true})
const mixer = require("./mixer.js")
const dbConnect = require("./modules/connect.js")
const fs = require("fs")

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.con = dbConnect
bot.icons = {}

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err)
    let folders = files.filter(f => f.split(".").pop() !== "js")
    folders.forEach(folder => {
        if(folder === "not for use" || folder === "modules") {
            return
        }
        fs.readdir(`./cmds/${folder}`, (err, files) => {
            let jsfiles1 = files.filter(f => f.split(".").pop() === "js")
            if(jsfiles1.length <= 0) {
            }
            jsfiles1.forEach((f, i) => {
                let props = require(`./cmds/${folder}/${f}`)
                bot.commands.set(props.help.name, props)
                if(props.conf.aliases.length > 0) {
                    props.conf.aliases.forEach(alias => {
                        bot.aliases.set(alias, props.help.name)
                    })
                }
            })
        })
    })
})
fs.readdir('./events/', (err, files) => {
    let folders = files.filter(f => f.split(".").pop() !== "js")
    folders.forEach(folder => {
        if(folder === "not for use") {
            return
        }
        fs.readdir(`./events/${folder}`, (err, files) => {
            let events = files.filter(f => f.split(".").pop() === "js")
            events.forEach((f, i) => {
                let eventName = f.split(".")[0];
                
                let event = require(`./events/${folder}/${f}`);
                console.log(event)
                bot.on(eventName, event.bind(null, bot));
                delete require.cache[require.resolve(`./events/${folder}/${f}`)];
              });
        })
    })
});

bot.login(process.env.BOT_TOKEN)