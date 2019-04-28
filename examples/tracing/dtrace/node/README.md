```
$ node app.js
$ sudo npx nhttpsnoop
```

```
TIME            PID PROBE     LATENCY METHOD PATH                
[ 16.643007]  77513 server    2.782ms GET    /                   
[ 18.381543]  77513 server    0.209ms GET    /                   
[ 20.761259]  77513 server    0.138ms GET    /test               
[ 23.299748]  77513 server    0.336ms GET    /testword           
[ 86.464386]  78269 server 4976.139ms GET    /testword           
[ 92.097725]  78269 server 3207.741ms GET    /testword   
```