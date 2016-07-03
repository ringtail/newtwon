/***
 *               _      _______     ___    _ _   _  _____  _____
 *         /\   | |    |_   _\ \   / / |  | | \ | |/ ____|/ ____|
 *        /  \  | |      | |  \ \_/ /| |  | |  \| | |    | (___
 *       / /\ \ | |      | |   \   / | |  | | . ` | |     \___ \
 *      / ____ \| |____ _| |_   | |  | |__| | |\  | |____ ____) |
 *     /_/    \_\______|_____|  |_|   \____/|_| \_|\_____|_____/
 *
 *     current support trigger probe.(such as redeploy , scale_in and scale_out).
 *
 */
var common = require('./common');
var CONST = common.CONST;
var request = require("sync-request");
var Remenber = require('./remenber');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

// MODULE CONST
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


/*
  action dispatcher and chose the job excutor.
*/
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
    } else {
        return new Error(CONST["HANDLER_NOT_FOUND"]);
    }

    switch (action) {
        case ALIYUNCS_TRIGGER:
            return triggerHandler(params);
        default:
            return new Error(CONST["HANDLER_NOT_FOUND"]);
    }
}


// simply probe the trigger.
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
