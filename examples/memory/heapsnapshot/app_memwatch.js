const memwatch = require("node-memwatch");
const heapdump = require("heapdump");
const http = require("http");
const server = http
  .createServer((req, res) => {
    for (let i = 0; i < 10000; i++) {
      server.on("request", function leakEventCallback() {});
    }
    res.end("Hello World");
    global.gc();
  })
  .listen(3000);
dump();
memwatch.on("leak", () => {
  dump();
});
function dump() {
  const filename = `${__dirname}/heapdump-${
    process.pid
  }-${Date.now()}.heapsnapshot`;
  heapdump.writeSnapshot(filename, () => {
    console.log(`${filename} dump completed.`);
  });
}
