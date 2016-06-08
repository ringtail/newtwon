/*
  add tunling rebot support
*/
var request = require("request")



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

function reply(words,callback){
  if (words == undefined) {
    return
  }
  var req = new commonRequest()
  var reqBody = req.gen(words)
  request.post({url:endpoint,form:reqBody},function(err,resp,body){
    // console.log(err,resp,body)
    return callback(err,resp,body)
  })
}

var tuling = {
  reply:reply
}

module.exports = tuling
