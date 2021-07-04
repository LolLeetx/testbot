const Discord = require('discord.js');
const fs = require('fs');

module.exports = {  
  name:`ping`,
  description: `ping`,
  execute(message, args) {
    if(message.author.bot){return}
    var ping = Date.now() - message.createdTimestamp;
    message.channel.send('my ping is: '+`**${ping}**`)
  }
}