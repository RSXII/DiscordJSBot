const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Data/userData.json', 'utf8'));
const botPrefs = JSON.parse(fs.readFileSync('Data/botPrefs.json', 'utf8'));
const helpCommands = fs.readFileSync('Data/help.txt', 'utf8');

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

    //check if admin
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
    //the server owners youtube page
    if(command === `${prefix}youtubeset`){
        botPrefs.youtubeLink = args[0];
    }
    if(command === `${prefix}twitchset`){
        botPrefs.twitchLink = args[0];
    }
    if(command === `${prefix}patreonset`){
        botPrefs.patreon = args[0];
    }
    if(command === `${prefix}streamer`){
        botPrefs.streamerName = args.join(' ');
    }
    if(command === `${prefix}liveyt`){
        message.channel.send(`${botPrefs.streamerName} is live on YouTube!`);
        message.channel.send(botPrefs.youtubeLink);
    }
    if(command === `${prefix}livetw`){
        message.channel.send(`${botPrefs.streamerName} is live on Twitch!`);
        message.channel.send(botPrefs.twitchLink);
    }
    // end settings section
    fs.writeFile('Data/botPrefs.json', JSON.stringify(botPrefs), (err) => {
        if(err) console.error(err);
    })

        if(command === `${prefix}modtest`){
            message.channel.send('You are an admin!');
        }
    }

    
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
    if(userData[sender.id].messagesSent === 5000){
        message.channel.send(`${sender} has leveled up!`)
    }
}
    //end of points system

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

    
})
//adds users who join the server to the default 'Member' group.  This can be changed to match your default group.
bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find('name', botPrefs.defaultGroup);

member.addRole(role);
})

bot.login(botSettings.token);