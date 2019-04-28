const EventEmitter = require("events");
const path = require('path')
const fs = require('fs');
class MyEE extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(1);
  }
}
const myEE = new MyEE();
function request() {
  myEE.on("foo", () => {});
}
function test(){
  fs.readFileSync(path.join(__dirname,'./trace-warnings.js'));
}

request();
request();
test()