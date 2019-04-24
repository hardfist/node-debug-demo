// server.js

const net = require('net');
const fs = require('fs');

const sock = '/tmp/example.sock';

if (fs.existsSync(sock)) {
    fs.unlinkSync(sock);
}
net.createServer().listen(sock).on('connection', function(c) {
    console.info('client connected');    
});