const botSettings = require("../botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');

module.exports = function (bot, message, command, args, sender, data){

if(data.botPrefs.points === true){  //begin if true
    if(command === `${prefix}points`){
        message.channel.send('You have ' + data.userData[sender.id].messagesSent + ` points ${sender}!`)
    }

    if(!data.userData[sender.id]) data.userData[sender.id] = {
        messagesSent: 0
    }
    data.userData[sender.id].messagesSent++;

    fs.writeFile('./Data/userData.json', JSON.stringify(data.userData), (err) => {
        if(err) console.error(err);
    })
    if(data.userData[sender.id].messagesSent === 5000){
        message.channel.send(`${sender} has leveled up!`)
    }
    }//end if true
}