const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

module.exports = function (bot, message, command, args, data) {

    if (command === `${prefix}givesword`) {
        message.channel.send(`Here's a sword ${sender}, try not to hurt yourself.`)
    }
    if (command === `${prefix}giveadena`) {
        message.channel.send(`${sender} has gained some adena!`)
    }
    if (command === `${prefix}botinfo`) {
        message.channel.send(`Version: ${data.botPrefs.version} ${data.botPrefs.developer} Github: ${data.botPrefs.github}`);
    }
    if (command === `${prefix}moon`) {
        console.log(args.toString());
        if (args.toString().toLowerCase() === 'prism,power,make,up!') {
            message.channel.send(`Sailor ${sender}, transform!`);
        }
    }

}// end export