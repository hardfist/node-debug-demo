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