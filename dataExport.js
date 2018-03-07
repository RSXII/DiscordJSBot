const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('Data/userData.json', 'utf8'));
const botPrefs = JSON.parse(fs.readFileSync('Data/botPrefs.json', 'utf8'));
const gameData = JSON.parse(fs.readFileSync('Data/gameData.json', 'utf8'));

module.exports = {
    userData,
    botPrefs,
    gameData
};