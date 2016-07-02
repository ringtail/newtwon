var common = {}
var CONST = {}
common.CONST = CONST

CONST["SUCCESS"] = "success";

CONST["MISSING_PARAMETERS"] = "Missing parameters when you use this function";
CONST["INVALID_PARAMS"] = "Invalid params passing";
CONST["HANDLER_NOT_FOUND"] = "Handler not found";
CONST["UNKNOWN_ERROR"] = "Unknown error"

common.filterParams = function(text) {
    var originParams = text.split(" ")
    var step = 1;
    for (var i = 0, len = originParams.length; i < len; i += step) {
        if (originParams[i] == "") {
            originParams.splice(i, 1);
            step = 0;
        }
        step = 1;
    }
    return originParams
}

module.exports = common;
