const Jimp = require('jimp')

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if(!user) user = message.author

    let linkRegex = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/gi
    let imageURL
    linkRegex.exec(args[0]) ? imageURL = args[0] : imageURL = user.displayAvatarURL

    Jimp.read(`https://discord.services/api/magik?url=${imageURL}`).then(function(image) {
        image.resize(768,768)
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if(error) message.channel.send("error fam")
            message.channel.send({files: [{ name: 'magik.png', attachment: buffer }] });
        });
    });


}

module.exports.help = {
    name: "magik",
    description: "Makes an image much better",
    usage: `magik (source)`,
    examples: [`magik`, `magik https://i.imgur.com/UdZQHBJ.jpg`, `magik @Hattyot`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
    cat: "Image"
  };