const TelegramBot = require('node-telegram-bot-api');

const token = '7182821291:AAErZgfLjBKUvUdXC-oBhelNuxk6ynBIr88';
const bot = new TelegramBot(token, {polling: false});



const send_tele_msg = (message) =>{
    bot.sendMessage(6598546837, message).then(()=> console.log("Message sent"));
}

module.exports = {send_tele_msg};