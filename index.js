const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Data/userData.json', 'utf8'));
const botPrefs = JSON.parse(fs.readFileSync('Data/botPrefs.json', 'utf8'));

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

    if(command === `${prefix}botsetup`){
        let botChannel = message.guild.channels.find('name', 'bot_settings');
        if(!message.guild.channels.exists('name', 'bot_settings')){
            message.guild.createChannel("bot_settings", "text")
            .then(channel => console.log('Created new channel ${channel}'))
            .then(function(value){
                botChannel = message.guild.channels.find('name', 'bot_settings');
                botChannel.send('Hello!.  Welcome to the Bot Setup!.  Here are a series of commands you can use to turn on settings.');
                botChannel.send(`Use !points on / !points off to enable / disable points.
                
Use !admin on / !admin off to enable / disable admin commands.


                `);
            })
            .catch(console.error);
        }else{
            botChannel.send('Hello!.  Welcome to the Bot Setup!.  Here are a series of commands you can use to turn on settings.');
        }
        
    }

    //enable / disable the settings

    if(command === `${prefix}points`){
        console.log(args);
        if(args[0] === 'off'){
            botPrefs.points = false;
        }
        if(args[0] === 'on'){
            botPrefs.points = true;
        }
       
    }

    // end settings section
    fs.writeFile('Data/botPrefs.json', JSON.stringify(botPrefs), (err) => {
        if(err) console.error(err);
    })

    
//this is the points system.
if(botPrefs.points === true){

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
}
    //end of points system

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
//adds users who join the server to the default 'Member' group.  This can be changed to match your default group.
bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find('name', 'Member');

member.addRole(role);
})

bot.login(botSettings.token);


