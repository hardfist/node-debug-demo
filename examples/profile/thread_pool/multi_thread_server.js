var Worker = require('webworker-threads').Worker;
require('http').createServer(function (req,res) {
  var fibo = new Worker(function() {
    function fibo (n) {
      return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
    }
    this.onmessage = function (event) {
      postMessage(fibo(event.data));
    }
  });
  fibo.onmessage = function (event) {
    res.end('result= ' + event.data);
  };
  fibo.postMessage(35);
}).listen(5555, () => {
  console.log('listen at http://localhost:5555')
});