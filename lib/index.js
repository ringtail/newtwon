var Botkit = require('botkit');
var tuling = require('./tuling')

var entry = {
  run:run
}

function run(){
  var controller = Botkit.slackbot({
    debug: process.env.debug || false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });

  controller.spawn({
    token: process.env.token,
  }).startRTM(function(error){
    if(error != undefined){
        console.log(error)
        process.exit(1);
    }
  })

  controller.on('direct_message',function(bot,message){
    var body = tuling.reply(message.text);
    bodyJson = JSON.parse(body)
    bot.reply(message,bodyJson.text);
  })

  controller.on('rtm_close',function(){
    console.log('rtm_close')
    process.exit(1);
  })
}

module.exports = entry
