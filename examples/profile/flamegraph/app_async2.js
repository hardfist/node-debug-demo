"use strict";

const restify = require("restify");
const server = restify.createServer();
function sleep(ms){
  return new Promise((resolve) => {
    setTimeout(resolve,ms);
  })
}

async function sleepA(ms) {
  return sleep(ms)
}
async function sleepB(ms) {
  return sleep(ms);
}
function a() {
  for (let i = 0; i < 1e3; i++) {}
}
function b() {
  for (let i = 0; i < 1e5; i++) {}
}

server.get("/", async function handle(req, res, next) {
  await sleepA(30);
  a();
  b();
  await sleepB(60);
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
