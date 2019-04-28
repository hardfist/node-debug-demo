"use strict";

const restify = require("restify");
const server = restify.createServer();

function sleepA(ms) {
  const future = Date.now() + ms;
  while (Date.now() < future);
}
function sleepB(ms) {
  const future = Date.now() + ms;
  while (Date.now() < future);
}
function a() {
  for (let i = 0; i < 1e3; i++) {}
}
function b() {
  for (let i = 0; i < 1e5; i++) {}
}

server.get("/", function handle(req, res, next) {
  sleepA(30);
  a();
  b();
  sleepB(60);
  res.send({});
  next();
});

server.listen(3000, () => {
  console.log("listen at: http://127.0.0.1:3000/");
});

process.on("SIGINT", function() {
  console.error("Caught SIGINT, shutting down.");
  server.close();
});