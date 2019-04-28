const http = require('http');
const host = "127.0.0.1"
const port = 1338

server = http.createServer(function myRequestListener(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  if(req.url === '/bug'){
    res.not_a_function()
  }
}).listen(port, host);

console.log(`Server process ${process.pid} running at http://${host}:${port}/`);