### loop
```
$ node loop.js
$ curl localhost:8080/loop # 触发死循环
$ kill -USR2 `pgrep -n node` # 发送信号，生成node-report
```
### oom
```
$ node  --max-old-space-size=10 oom.js
$ curl localhost:
```