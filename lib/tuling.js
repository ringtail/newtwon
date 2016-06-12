/*
  add tunling rebot support
*/
var request = require("sync-request")



var endpoint = "http://www.tuling123.com/openapi/api"

var commonRequest = function(){
  this.key  = process.env.key
  this.useid = "slack"
}

commonRequest.prototype.gen = function(info){
  this.info = info
  return {
    key:this.key,
    userid:this.useid,
    info:this.info
  }
}

function reply(words){
  if (words == undefined) {
    return
  }
  var req = new commonRequest();
  var reqBody = req.gen(words);
  var res = request("POST",endpoint,{json:reqBody});
  return res.getBody('utf8');
}

var tuling = {
  reply:reply
}

module.exports = tuling
