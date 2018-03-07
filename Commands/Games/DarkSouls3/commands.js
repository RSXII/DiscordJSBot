const botSettings = require("../../../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');

module.exports = function (bot, message, command, args, sender, data){
    if(command === `${prefix}ds3`){
        if(args[0] === 'build' && !args[1]){
            message.channel.send({embed: {
                color: 1782121,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "Current Dark Souls 3 Build",
                fields: [{
                    
                    name: `**__Level__** ${data.gameData.ds3.currentbuild[0]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Vigor__** ${data.gameData.ds3.currentbuild[1]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Attunement__** ${data.gameData.ds3.currentbuild[2]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Endurance__** ${data.gameData.ds3.currentbuild[3]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Vitality__** ${data.gameData.ds3.currentbuild[4]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Strength__** ${data.gameData.ds3.currentbuild[5]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Dexterity__** ${data.gameData.ds3.currentbuild[6]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Intelligence__** ${data.gameData.ds3.currentbuild[7]}`,
                    value: "----------------"
                },
                {
                    
                    name: `**__Faith__** ${data.gameData.ds3.currentbuild[8]}`,
                    value: `----------------`
                },
                {
                    
                    name: `**__Luck__** ${data.gameData.ds3.currentbuild[9]}`,
                    value: "----------------"
                }
            ], //end of fields ////////////
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: "BroBot DS3 Build Manager"
            }
            }});
        }
    }
}