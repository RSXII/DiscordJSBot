const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');

module.exports = function (bot, message, command, args, sender, botPrefs, userData){

if(botPrefs.points === true){  //begin if true
    if(command === `${prefix}points`){
        message.channel.send('You have ' + userData[sender.id].messagesSent + ` points ${sender}!`)
    }

    if(!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0
    }
    userData[sender.id].messagesSent++;

    fs.writeFile('./Data/userData.json', JSON.stringify(userData), (err) => {
        if(err) console.error(err);
    })
    if(userData[sender.id].messagesSent === 5000){
        message.channel.send(`${sender} has leveled up!`)
    }
    }//end if true
}