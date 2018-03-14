const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

module.exports = function (bot, message, command, args, data) {

    if (command === `${prefix}botsetup`) {
        let botChannel = message.guild.channels.find('name', 'bot_settings');
        if (!message.guild.channels.exists('name', 'bot_settings')) {
            message.guild.createChannel("bot_settings", "text")
                .then(channel => console.log('Created new channel ${channel}'))
                .then(function (value) {
                    botChannel = message.guild.channels.find('name', 'bot_settings');
                    botChannel.send('Hello!.  Welcome to the Bot Setup!.  Here are a series of commands you can use to turn on settings.');
                    botChannel.send(`Use !points on / !points off to enable / disable points.
            
Use !admin on / !admin off to enable / disable admin commands.


            `);
                })
                .catch(console.error);
        } else {
            botChannel.send('Hello!.  Welcome to the Bot Setup!.  Here are a series of commands you can use to turn on settings.');
        }

    } // end botsetup

}// end export