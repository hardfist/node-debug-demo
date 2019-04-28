
var workerpool = require('workerpool');
var pool = workerpool.pool({
  nodeWorker: 'thread',
  minWorkers: 'max' 
});
 
function add(a, b) {
  while(true){

  }
}
 
pool.exec(add, [3, 4])
pool.exec(add, [3,4])
pool.exec(add, [1,2])
pool.exec(add, [0,1])