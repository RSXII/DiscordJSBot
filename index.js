const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const data = require('./dataExport.js');
const helpCommands = fs.readFileSync('Data/help.txt', 'utf8');
const modCommands = require('./Commands/mod.js');
const pointsCommands = require('./Commands/points.js');
const ds3Commands = require('./Commands/Games/DarkSouls3/commands.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username} version ${data.botPrefs.version}`);
    bot.user.setStatus('Online');
    bot.user.setActivity('Waiting for commands...');
    bot.user.setAvatar('./image/brobot.png');

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

    //check if admin ////////////////////////////
        modCommands(bot, message, command, args, data);
     //end check if admin ///////////////////////

    
    //this is the points system /////////////////
        pointsCommands(bot, message, command, args, sender, data);
    //end of points system /////////////////////

    // if(!command.startsWith(prefix)) return;

    if(command === `${prefix}userinfo`){
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This user has " + data.userData[sender.id].messagesSent + " points")
        .setColor("#e0e234")
        .setTimestamp();
        message.channel.sendEmbed(embed);
    }
    if(command === `${prefix}hello`){
        message.reply("Hello there!");
    }
    if(command === `${prefix}help`){
        message.author.sendMessage(helpCommands);
        message.author.sendMessage(`Also don't forget to support ${data.botPrefs.streamerName} on
Patreon ${data.botPrefs.patreon}
Youtube ${data.botPrefs.youtubeLink}
Twitch ${data.botPrefs.twitchLink}`);
    }

    if(command === `${prefix}givesword`){
        message.channel.send(`Here's a sword ${sender}, try not to hurt yourself.`)
    }
    if(command === `${prefix}giveadena`){
        message.channel.send(`${sender} has gained some adena!`)
    }
    if(command === `${prefix}botinfo`){
        message.channel.send(`Version: ${data.botPrefs.version} ${data.botPrefs.developer} Github: ${data.botPrefs.github}`);
    }
    if(command === `${prefix}moon`){
        console.log(args.toString());
        if(args.toString().toLowerCase() === 'prism,power,make,up!'){
            message.channel.send(`Sailor ${sender}, transform!`);
        }
    }

    //Game specific commands ///////////////
    ds3Commands(bot, message, command, args, sender, data);

    //End Game specific commands ///////////
})
//adds users who join the server to the default 'Member' group.  This can be changed to match your default group.
bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find('name', data.botPrefs.defaultGroup);

member.addRole(role);
})

bot.login(botSettings.token);