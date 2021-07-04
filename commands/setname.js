const Discord = require('discord.js');
const fs = require('fs');

module.exports = {  
  name:`setname`,
  description: `setname`,
  execute(message, args) {
    
    var targetname = null
    const filter = msg => msg.author.id == message.author.id;
    const opt = {
      target: null,
      name: null,
      time: null,
    }

    const collector = message.channel.createMessageCollector(filter, { time: 80000 });
    console.log(opt)

    message.channel.send('whose name u want to change')
    collector.on("collect", (m) => {

      console.log('m: ' + m.content)

      if (opt.target && !opt.name && !opt.time) {
        opt.name = m.content;
        const setnameembed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Change name')
          .setDescription(`so you want change ${targetname} to **${opt.name}**?`)

        const setnameembed2 = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Change name')
          .setDescription(`name changed`)

        const setnameembed3 = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Prevention')
          .setDescription(`ok! do you want to prevent ${targetname} from changing its name?`)

        const setnameembed4 = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Prevention')
          .setDescription(`ok! i wont prevent it `)

        const setnameembed5 = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Prevention')
          .setDescription(`so how long do you want to prevent ${targetname} change his name?(say in minutes)(pls dont be toxic put 999999) `)

        const setnameembed6 = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Prevention')
          .setDescription(`ok! done `)


        message.channel.send(setnameembed).then((sendEmbed) => {
          sendEmbed.react('✅')
          sendEmbed.react('❎')

          console.log('send react')
          const filter2 = (reaction, user) => {
            return ['❎', '✅'].includes(reaction.emoji.name) && user.id === message.author.id && !user.bot;
          };

          const collector2 = sendEmbed.createReactionCollector(filter2, { time: 80000 });
          collector2.on('collect', (reaction, user) => {
            console.log('collector')
            console.log(`${reaction.emoji.name}${user.tag}`)
            if (reaction.emoji.name === '✅') {
              sendEmbed.edit(setnameembed2)
              message.guild.members.cache.get(opt.target).setNickname(`${opt.name}`)
              console.log(`${reaction.emoji.name}${user.tag}`)


              sendEmbed.channel.send(setnameembed3).then((sendEmbed2) => {
                sendEmbed2.react('✅')
                sendEmbed2.react('❎')
                const filter3 = (reaction, user) => {
                  return ['❎', '✅'].includes(reaction.emoji.name) && user.id === message.author.id && !user.bot;
                };

                const collector3 = sendEmbed2.createReactionCollector(filter3, { time: 80000 });
                collector3.on('collect', (reaction, user) => {

                  if (reaction.emoji.name === '✅') {
                    console.log('he say yes')


                    sendEmbed2.channel.send(setnameembed5)
                    const filter = msg => msg.author.id == message.author.id;
                    const collector4 = sendEmbed2.channel.createMessageCollector(filter, { time: 80000 });
                    collector4.on("collect", (prevans) => {
                      if (!opt.time && opt.target && opt.name) {

                        var numbers = /^[0-9]+$/;
                        if (prevans.content.match(numbers)) {
                          opt.time = prevans.content
                          console.log(opt.time)
                          const prevansembed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Prevention')
                            .setDescription(`ok so you want to prevent ${targetname} to change his name for **${opt.time}** minutes`)

                          sendEmbed2.channel.send(prevansembed).then((sendEmbed3) => {
                            console.log('opt.time' + opt.time)
                            sendEmbed3.react('✅')
                            sendEmbed3.react('❎')
                            const filter5 = (reaction, user) => {
                              return ['❎', '✅'].includes(reaction.emoji.name) && user.id === message.author.id && !user.bot;
                            };
                            const collector5 = sendEmbed3.createReactionCollector(filter5, { time: 80000 });
                            collector5.on('collect', (reaction, user) => {

                              if (reaction.emoji.name === '✅') {
                                console.log('he say yes two times')
                                var start = new Date();
                                var timer_id = setInterval(function() {
                                  if (new Date() - start > (opt.time * 60000)) {
                                    clearInterval(timer_id);
                                  } else {
                                    console.log('changing name')
                                    message.guild.members.cache.get(opt.target).setNickname(`${opt.name}`)
                                  }
                                }, 5000);
                                sendEmbed3.edit(setnameembed6)

                              }

                              if (reaction.emoji.name === '❎') {
                                sendEmbed3.channel.send('cancel.Please rerun the command if you want to set name again')
                                console.log(`${reaction.emoji.name}${user.tag}`)
                                console.log('stop collector')
                                collector5.stop()
                                collector4.stop()
                                collector3.stop()
                                collector2.stop()
                                collector.stop()
                              }
                            });
                          });
                        }

                        else {
                          message.channel.send('input error.please rerun the command to set name again')
                          collector4.stop()
                          collector3.stop()
                          collector2.stop()
                          collector.stop()
                        }
                      }
                    });
                  }

                  if (reaction.emoji.name === '❎') {
                    sendEmbed2.edit(setnameembed4)
                    console.log(`${reaction.emoji.name}${user.tag}`)
                    console.log('stop collector')
                    collector3.stop()
                    collector.stop()
                    collector2.stop()
                    collector.stop()
                  }
                });
              });
            }

            if (reaction.emoji.name === '❎') {
              message.channel.send('cancel.Please rerun the command if you want to set name again')
              console.log(`${reaction.emoji.name}${user.tag}`)
              console.log('stop collector')
              collector2.stop()
              collector.stop()
            }
          });

          collector2.on('end', collected => {
            console.log(`collector2 Collected ${collected.size} items`);
          });
        });

      }

      if (!opt.target && !opt.name && !opt.time) {
        console.log('no target no name no time')

        console.log('m:', m.content)
        if (m.content.includes('@')) {
          console.log('recieved  nick name')
          targetname = m.content;
          opt.target = `${m}`.replace(/[^\d.-]/g, "");
          message.channel.send("ok! so change to what name?");
        }

        else {
          collector.stop()
          message.channel.send('input error.please rerun the command to set name again')
        }
      }
    })

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
    });

  }
}