const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Data/userData.json', 'utf8'));
const botPrefs = JSON.parse(fs.readFileSync('Data/botPrefs.json', 'utf8'));
const helpCommands = fs.readFileSync('Data/help.txt', 'utf8');
const modCommands = require('./Commands/mod.js');
const pointsCommands = require('./Commands/points.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log('Bot is ready! ${bot.user.username}');
    bot.user.setStatus('Online');
    bot.user.setGame('Waiting for commands...');

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

    //check if admin ///////////////////////////
    
        
        modCommands(bot, message, command, args, botPrefs, userData);

     //end check if admin ///////////////////////

    
    //this is the points system //////////////////
    

        pointsCommands(bot, message, command, args, sender, botPrefs, userData);
    
    //end of points system /////////////////////

    if(!command.startsWith(prefix)) return;


    if(command === `${prefix}userinfo`){
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This user has " + userData[sender.id].messagesSent + " points")
        .setColor("#e0e234")
        .setTimestamp();
        message.channel.sendEmbed(embed);
    }
    if(command === `${prefix}hello`){
        message.reply("Hello there!");
    }
    if(command === `${prefix}help`){
        message.author.sendMessage(helpCommands);
        message.author.sendMessage(`Also don't forget to support ${botPrefs.streamerName} on
Patreon ${botPrefs.patreon}
Youtube ${botPrefs.youtubeLink}
Twitch ${botPrefs.twitchLink}`);
    }

    if(command === `${prefix}givesword`){
        message.channel.send(`Here's a sword ${sender}, try not to hurt yourself.`)
    }
    if(command === `${prefix}giveadena`){
        message.channel.send(`${sender} has gained some adena!`)
    }
    if(command === `${prefix}botinfo`){
        message.channel.send(`Version: ${botPrefs.version} ${botPrefs.developer} Github: ${botPrefs.github}`);
    }
})
//adds users who join the server to the default 'Member' group.  This can be changed to match your default group.
bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find('name', botPrefs.defaultGroup);

member.addRole(role);
})

bot.login(botSettings.token);