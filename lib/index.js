var Botkit = require('botkit');
var tuling = require('./tuling')

var entry = {
  run:run
}

function run(){
  var controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
  });

  controller.spawn({
    token: process.env.token,
  }).startRTM()

  controller.on('direct_message',function(bot,message){
    var that = this;
     tuling.reply(message.text,function(err,resp,body){
      //  bot.reply(message,body);
      var bodyJson = JSON.parse(body)
      bot.reply(message,bodyJson.text);
    })
  })
}

module.exports = entry
