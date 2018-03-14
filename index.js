const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const fs = require('fs');
const data = require('./dataExport.js');
const helpCommands = fs.readFileSync('Data/help.txt', 'utf8');
const modCommands = require('./Commands/mod.js');
const pointsCommands = require('./Commands/points.js');
const ds3Commands = require('./Commands/Games/DarkSouls3/commands.js');
const extraCommands = require('./Commands/extra.js');
const setupCommands = require('./Commands/setup.js');
const helpCommands = require('./Commands/help.js');

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username} version ${data.botPrefs.version}`);
    bot.user.setStatus('Online');
    bot.user.setActivity('Waiting for commands...');
    bot.user.setAvatar('./image/brobot.png');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);
    }

});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let sender = message.author;
    let msg = message.content.toUpperCase();
    let isAdmin = false;

    //if doesn't begin with prefix, ignore ///////
    if (!command.startsWith(prefix)) return;

    //this is the setup system ////////////////////
    setupCommands(bot, message, command, args, data);
    //end setup system ////////////////////////////

    //this is for extra commands ///////////////////
    extraCommands(bot, message, command, args, data);
    //end extra commands //////////////////////////

    //check if admin ////////////////////////////
    modCommands(bot, message, command, args, data);
    //end check if admin ///////////////////////


    //this is the points system /////////////////
    pointsCommands(bot, message, command, args, sender, data);
    //end of points system /////////////////////

    //this is help message PM's ///////////////////
    helpCommands(bot, message, command, args, data);
    //end help message ////////////////////////////

    //Game specific commands /////////////////////
    ds3Commands(bot, message, command, args, sender, data);
    //End Game specific commands /////////////////

}) // end bot.on ////////////////////////////////////////////////////
//adds users who join the server to the default 'Member' group.  This can be changed to match your default group.
bot.on('guildMemberAdd', member => {

    let role = member.guild.roles.find('name', data.botPrefs.defaultGroup);

    member.addRole(role);
})

bot.login(botSettings.token);