var Botkit = require('botkit');
var tuling = require('./tuling');
var aliyuncs = require('./aliyuncs');
var Remenber = require('./remenber');

var entry = {
    run: run
}

function run() {
    var controller = Botkit.slackbot({
        debug: process.env.debug || false
    });

    controller.spawn({
        token: process.env.token,
        retries: 500
    }).startRTM(function(error) {
        if (error != undefined) {
            console.log(error)
            process.exit(1);
        }
    })

    controller.hears('容器服务 ([\u4e00-\u9fa5_a-zA-Z0-9])*', ['direct_message'], function(bot, message) {
        var text = message.text;
        respText = aliyuncs.reply(text);
        bot.reply(message, respText);
    });

    controller.hears('记住 ([\u4e00-\u9fa5_a-zA-Z0-9])*', ['direct_message'], function(bot, message) {
        var text = message.text;
        var remenber =  new Remenber();
        respText = remenber.reply(text);
        bot.reply(message, String(respText))
    });

    controller.on('direct_message', function(bot, message) {
        var body = tuling.reply(message.text);
        bodyJson = JSON.parse(body)
        bot.reply(message, bodyJson.text);
    })

    controller.on('rtm_close', function() {
        process.exit(1);
    })
}

module.exports = entry
