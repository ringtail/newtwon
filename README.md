## About newtwon
newtwon is my slack robot, you can talk to him when you are boring.   
## Usage
simply deploy it to anywhere with docker.

```
netwon:
    image: registry.aliyuncs.com/ringtail/newtwon:latest
    restart: always
    environment:
        - debug=true
        - key=<TUNLING_API_KEY>
        - token=<SLACK_TOKEN>
```

## links  
tuling Api: tuling123.com
