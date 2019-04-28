// client.js

const net = require('net');
const sock = '/tmp/example.sock';

const socket = new net.Socket();
console.log('client pid:', process.pid)

socket.pause();

socket.on('end', () => {
    console.info('end');
});
socket.on('close', () => {
    console.info('close');
});
socket.on('error', (err) => {
    console.error(err);
});
socket.on('connect', () => {
    console.info('connect');
});

socket.connect(sock);

setInterval(() => {
    console.info('interval');
}, 10000);