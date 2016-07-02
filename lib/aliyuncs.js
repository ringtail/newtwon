var common = require('./common');
var CONST = common.CONST;
var request = require("sync-request");
var Remenber = require('./remenber');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();


var ALIYUNCS_PARAMS_LENGTH = 3;
var ALIYUNCS_TRIGGER = "触发"
var aliyuncs = {
    reply: reply
};

function reply(text) {
    var params = common.filterParams(text);
    if (params.length != ALIYUNCS_PARAMS_LENGTH) {
        return new Error(CONST["INVALID_PARAMS"]);
    }
    var action = params[1];
    return actionHandler(action, params);
}



function actionHandler(action, params) {
    var remenber = new Remenber();
    var matchStr = params[2].match(/\$.([\u4e00-\u9fa5_a-zA-Z0-9])*/);
    if (matchStr != null && matchStr.length != 0) {
        var text = remenber.get(matchStr[0].split("$")[1]);
        if (text == undefined) {
            return new Error(CONST["HANDLER_NOT_FOUND"])
        } else {
            var decodeStr = entities.decode(text)
            if (decodeStr[0] == "<" && decodeStr[decodeStr.length - 1] == ">") {
                params[2] = decodeStr.slice(1, decodeStr.length - 1);
            } else {
                params[2] = text;
            }
        }
    }else{
      return new Error(CONST["HANDLER_NOT_FOUND"]);
    }

    switch (action) {
        case "触发":
            return triggerHandler(params);
        default:
            return new Error(CONST["HANDLER_NOT_FOUND"]);
    }
}

function triggerHandler(params) {
    var endpoint = params[2];
    console.log(endpoint)
    try {
        request("POST", decodeURI(endpoint), {});
    } catch (e) {
        //CATCH EVERYTHING;
    }

    return CONST['SUCCESS'];
}

module.exports = aliyuncs;
