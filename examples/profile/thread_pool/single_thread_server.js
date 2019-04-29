var Worker = require('webworker-threads').Worker;
require('http').createServer(function (req,res) {
   function fibo (n) {
      return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
   }
  res.end('result: '+fibo(35));
}).listen(5555, () => {
  console.log('listen at http://localhost:5555')
});