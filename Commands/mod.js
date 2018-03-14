const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');

module.exports = function (bot, message, command, args, data) {
    if (message.member.roles.find("name", "Admin")) {
        //enable / disable the settings
        if (command === `${prefix}points`) {
            if (args[0] === 'off') {
                data.botPrefs.points = false;
            }
            if (args[0] === 'on') {
                data.botPrefs.points = true;
            }

        }

        //the default group members are placed into upon joining.
        if (command === `${prefix}defaultgroup`) {
            data.botPrefs.defaultGroup = args.join(' ');
        }
        //set the youtube link
        if (command === `${prefix}youtubeset`) {
            data.botPrefs.youtubeLink = args[0];
        }
        //set the twitch link
        if (command === `${prefix}twitchset`) {
            data.botPrefs.twitchLink = args[0];
        }
        //set the patreon link
        if (command === `${prefix}patreonset`) {
            data.botPrefs.patreon = args[0];
        }
        //what is the streamers name
        if (command === `${prefix}streamer`) {
            data.botPrefs.streamerName = args.join(' ');
        }
        //declare that the streamer is live on youtube
        if (command === `${prefix}liveyt`) {
            message.channel.send(`${data.botPrefs.streamerName} is live on YouTube!`);
            message.channel.send(data.botPrefs.youtubeLink);
        }
        //declare that the streamer is live on twitch
        if (command === `${prefix}livetw`) {
            message.channel.send(`${data.botPrefs.streamerName} is live on Twitch!`);
            message.channel.send(data.botPrefs.twitchLink);
        }
        // end settings section
        fs.writeFile('./Data/botPrefs.json', JSON.stringify(data.botPrefs), (err) => {
            if (err) console.error(err);
        })
        if (command === `${prefix}ds3`) {
            if (args[0] === 'set' && args[1] === 'build') {
                data.gameData.ds3.currentbuild[0] = args[2];
                data.gameData.ds3.currentbuild[1] = args[3];
                data.gameData.ds3.currentbuild[2] = args[4];
                data.gameData.ds3.currentbuild[3] = args[5];
                data.gameData.ds3.currentbuild[4] = args[6];
                data.gameData.ds3.currentbuild[5] = args[7];
                data.gameData.ds3.currentbuild[6] = args[8];
                data.gameData.ds3.currentbuild[7] = args[9];
                data.gameData.ds3.currentbuild[8] = args[10];
                data.gameData.ds3.currentbuild[9] = args[11];
                message.channel.send('Build Set!');

                fs.writeFile('./Data/gameData.json', JSON.stringify(data.gameData), (err) => {
                    if (err) console.error(err);
                })
            }
        }

    }
}//end export function