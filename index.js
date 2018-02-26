const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Data/userData.json', 'utf8'))

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log('Bot is ready! ${bot.user.username}');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e){
        console.log(e.stack);
    }
    
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let sender = message.author;
    let msg = message.content.toUpperCase();
    let isAdmin = false;

//this is the points system. Comment out starting here to disable points system
    if(command === `${prefix}points`){
        message.channel.send('You have ' + userData[sender.id].messagesSent + ` points ${sender}!`)
    }

    if(!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0
    }
    userData[sender.id].messagesSent++;

    fs.writeFile('Data/userData.json', JSON.stringify(userData), (err) => {
        if(err) console.error(err);
    })
    if(userData[sender.id].messagesSent === 15){
        message.channel.send(`${sender} has leveled up!`)
    }

    //comment out ending here to disable points system.

    if(!command.startsWith(prefix)) return;

    if(message.member.roles.find("name", "SuperAdmin")){
        if(command === `${prefix}modtest`){
            message.channel.send('You are an admin!');
        }
    }


    if(command === `${prefix}userinfo`){
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription(args)
        .setColor("#e0e234")
        .setTimestamp();
        message.channel.sendEmbed(embed);
    }
    if(command === `${prefix}hello`){
        message.reply("Hello there!");
    }

    
})

bot.login(botSettings.token);


