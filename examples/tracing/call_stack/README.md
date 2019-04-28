# call stack
## 同步调用栈
对于同步调用可以轻松的获取调用栈
```
function a(){
  b()
}
function b(){
  c()
}
function c(){
  console.log(new Error().stack)
}
a()
```
打印结果如下
```
Error
    at c (/Users/yj/projects/node-debug/examples/async_hooks/app_sync.js:8:15)
    at b (/Users/yj/projects/node-debug/examples/async_hooks/app_sync.js:5:3)
    at a (/Users/yj/projects/node-debug/examples/async_hooks/app_sync.js:2:3)
    at Object.<anonymous> (/Users/yj/projects/node-debug/examples/async_hooks/app_sync.js:12:1)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
```
可以看出a -> b -> c的调用链，利于问题的排查
## 异步调用
但是对于异步调用却很难获取调用链，如下面的代码
```
function a(){
  setTimeout(crash,1000);
}
function b(){
  setTimeout(crash, 1000);
}
function crash () {
  console.log(new Error().stack)
}

a()
```
调用结果为
```
Error
    at Timeout.crash [as _onTimeout] (/Users/yj/projects/node-debug/examples/async_hooks/app.js:9:15)
    at ontimeout (timers.js:436:11)
    at tryOnTimeout (timers.js:300:5)
    at listOnTimeout (timers.js:263:5)
    at Timer.processTimers (timers.js:223:10)
```
我们看不出来是a还是b调用了crash函数，对于复杂的应用，没有调用链将导致问题很难排查，借助于async hooks 我们可以获取异步调用的调用链，甚至可以进一步的获取每个异步请求的调用时间，便于排查问题。
```
const hooks = require('async_hooks')
const stacks = []

hooks
  .createHook({
    // save the stack when we do something async
    init: (id, type, trigger) => (stacks[id] = new Error('hooks get error stack').stack)
  })
  .enable()

function a(){
  setTimeout(crash,1000);
}
function b(){
  setTimeout(crash, 1000);
}

function crash() {
    console.log(stacks[hooks.executionAsyncId()])
    throw new Error('an async error')
}

a()
```
调用结果为
```
Error: hooks get error stack
    at AsyncHook.init (/Users/yj/projects/node-debug/examples/async_hooks/app_with_async_hooks.js:7:48)
    at emitInitNative (internal/async_hooks.js:137:43)
    at emitInitScript (internal/async_hooks.js:336:3)
    at initAsyncResource (internal/timers.js:50:5)
    at new Timeout (internal/timers.js:82:3)
    at setTimeout (timers.js:414:19)
    at a (/Users/yj/projects/node-debug/examples/async_hooks/app_with_async_hooks.js:12:3)
    at Object.<anonymous> (/Users/yj/projects/node-debug/examples/async_hooks/app_with_async_hooks.js:23:1)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
/Users/yj/projects/node-debug/examples/async_hooks/app_with_async_hooks.js:20
    throw new Error('an async error')
    ^

Error: an async error
    at Timeout.crash [as _onTimeout] (/Users/yj/projects/node-debug/examples/async_hooks/app_with_async_hooks.js:20:11)
    at ontimeout (timers.js:436:11)
    at tryOnTimeout (timers.js:300:5)
    at listOnTimeout (timers.js:263:5)
    at Timer.processTimers (timers.js:223:10)
```
我们根据上述日志，可以从`hooks get error stack`里看出是a调用了crash。`node-clinic` bubbleprof正是利用了async_hooks实现了异步请求的调用链查询。
## async-stack-traces
node 12已经开始支持--async-stack-traces这个特性，原生的可以追踪异步调用栈了。
```
async function foo() {
  await bar();
  return 42;
}

async function bar() {
  await Promise.resolve();
  throw new Error('BEEP BEEP');
}

foo().catch(error => console.log(error.stack));
```
在node10中调用结果
```
Error: BEEP BEEP
    at bar (/Users/yj/repos/node-debug-demo/examples/tracing/call_stack/async-stack-trace.js:8:9)
    at process._tickCallback (internal/process/next_tick.js:68:7)
    at Function.Module.runMain (internal/modules/cjs/loader.js:757:11)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)
```
无法看出调用bar的地方，
在node12中调用开启--async-stack-traces
```
node --async-stack-traces examples/tracing/call_stack/async-stack-trace.js
```
结果如下
```
Error: BEEP BEEP
    at bar (/Users/yj/repos/node-debug-demo/examples/tracing/call_stack/async-stack-trace.js:8:9)
    at process.runNextTicks [as _tickCallback] (internal/process/task_queues.js:54:5)
    at Function.Module.runMain (internal/modules/cjs/loader.js:828:11)
    at internal/main/run_main_module.js:17:11
    at async foo (/Users/yj/repos/node-debug-demo/examples/tracing/call_stack/async-stack-trace.js:2:3)
```
可以看出是foo调用了bar