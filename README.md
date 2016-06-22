## About newtwon
<img src="http://moyuan.oss-cn-beijing.aliyuncs.com/others/iblbwe01046912.jpg" witdh=60px height=60px/></br>
newtwon is my slack robot, you can talk to him when you are boring.   

## Run in local

```
key=<TUNLING_API_KEY>  token=<SLACK_TOKEN> node index.js

```

## Run in production  

simply deploy it to anywhere with docker.

```
newton:
    image: registry.aliyuncs.com/ringtail/newtwon:latest
    restart: always
    environment:
        - debug=true
        - key=<TUNLING_API_KEY>
        - token=<SLACK_TOKEN>
```

or simply run with docker

```
docker run -d --restart=always -e key=<TUNLING_API_KEY> -e token=<SLACK_TOKEN>  -e debug=true --name newtwon registry.aliyuncs.com/ringtail/newtwon:latest

```
or simple run with pm2

```
  key=<TUNLING_API_KEY>  token=<SLACK_TOKEN> pm2 --name newtwon start index.js

```

## Known problem   
Bot will disconnect after few hours.So Newtwon will shut down and docker or pm2 will restart it.

## Demonstration
<img src="http://moyuan.oss-cn-beijing.aliyuncs.com/others/85e3ac1194620666f826e9bbdef6dc32.png"/>

## links  
tuling Api: tuling123.com     
slack : slack.com
