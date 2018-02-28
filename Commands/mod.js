const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');

module.exports = function (bot, message, command, args, botPrefs, userData){
if(message.member.roles.find("name", "Admin")){
//enable / disable the settings
if(command === `${prefix}points`){
    if(args[0] === 'off'){
        botPrefs.points = false;
    }
    if(args[0] === 'on'){
        botPrefs.points = true;
    }
   
}

    //the default group members are placed into upon joining.
    if(command === `${prefix}defaultgroup`){
        botPrefs.defaultGroup = args.join(' ');
    }
    //set the youtube link
    if(command === `${prefix}youtubeset`){
        botPrefs.youtubeLink = args[0];
    }
    //set the twitch link
    if(command === `${prefix}twitchset`){
        botPrefs.twitchLink = args[0];
    }
    //set the patreon link
    if(command === `${prefix}patreonset`){
        botPrefs.patreon = args[0];
    }
    //what is the streamers name
    if(command === `${prefix}streamer`){
        botPrefs.streamerName = args.join(' ');
    }
    //declare that the streamer is live on youtube
    if(command === `${prefix}liveyt`){
        message.channel.send(`${botPrefs.streamerName} is live on YouTube!`);
        message.channel.send(botPrefs.youtubeLink);
    }
    //declare that the streamer is live on twitch
    if(command === `${prefix}livetw`){
        message.channel.send(`${botPrefs.streamerName} is live on Twitch!`);
        message.channel.send(botPrefs.twitchLink);
    }
    // end settings section
    fs.writeFile('./Data/botPrefs.json', JSON.stringify(botPrefs), (err) => {
        if(err) console.error(err);
    })
    }
}//end export function