# 使用0x生成火焰图
### 基于v8的tick processor
```
NODE_ENV=production 0x -P 'autocannon http://localhost:3000/' ./app.js
```
```
NODE_ENV=production 0x -P 'autocannon http://localhost:3000/' ./app_asyn2.js

```
```
NODE_ENV=production 0x -P 'autocannon http://localhost:3000/' ./app_async.js
```
### 基于perf|dtrace 生成火焰图
```
NODE_ENV=production 0x --kernel-tracing -P 'autocannon http://localhost:3000/' ./app.js

```