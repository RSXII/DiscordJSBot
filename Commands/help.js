const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

module.exports = function (bot, message, command, args, data) {
    if (command === `${prefix}help`) {
        message.author.sendMessage(helpCommands);
        message.author.sendMessage(`Also don't forget to support ${data.botPrefs.streamerName} on
Patreon ${data.botPrefs.patreon}
Youtube ${data.botPrefs.youtubeLink}
Twitch ${data.botPrefs.twitchLink}`);
    } // end help
} // end export