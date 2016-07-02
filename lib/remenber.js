var common = require('./common');
var REMENBER_OPERATE_PARAMS_LENGTH = 3;
var REMENBER_LIST_PARAMS_LENGTH = 2;
var REMENBER_LIST_COMMAND = "全部"
var CONST = common.CONST;
var CACHE = {};


function remenber() {
    this.cache = CACHE;
}

remenber.prototype.reply = function(text) {
    var params = common.filterParams(text);

    if (params.length == REMENBER_LIST_PARAMS_LENGTH) {
        if (params[1] == REMENBER_LIST_COMMAND) {
            return this.list();
        } else {
            try {
                return this.get(params[1]);
            } catch (e) {
                return new Error(CONST['UNKNOWN_ERROR']);
            }
        }
    } else if (params.length == REMENBER_OPERATE_PARAMS_LENGTH) {
        try {
            this.set(params[1], params[2]);
        } catch (e) {
            return new Error(CONST['UNKNOWN_ERROR']);
        }
        return CONST['SUCCESS'];
    } else {
        return new Error(CONST['HANDLER_NOT_FOUND']);
    }
}


remenber.prototype.push = function(kv) {
    if (!(kv != undefined && kv["key"] && kv["value"])) {
        return new Error(CONST["MISSING_PARAMETERS"]);
    }
    this.set(kv["key"], kv["value"]);
}

remenber.prototype.get = function(key) {
    if (key == undefined) {
        return new Error(CONST["MISSING_PARAMETERS"]);
    }
    return this.cache[key];
}

remenber.prototype.set = function(key, value) {
    if (key == undefined || value == undefined) {
        return new Error(CONST["MISSING_PARAMETERS"]);
    }
    this.cache[key] = value;
}

remenber.prototype.list = function() {
    var cache = this.cache;
    var resutls = [];
    for (prop in cache) {
        resutls.push(prop + " [=] " + cache[prop]);
    }
    return resutls.join("\n");
}
module.exports = remenber
