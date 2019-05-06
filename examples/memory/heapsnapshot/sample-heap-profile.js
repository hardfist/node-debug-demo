const heapProfile = require('heap-profile');

heapProfile.start();

require('heapdump')
const leaks = [];

class LeakingClass {
  constructor() {
    this.name = Math.random().toString(36);
    this.age = Math.floor(Math.random() * 100);
  }
}
function leak1(){
   for (let i = 0; i < 100000; i++) {
    leaks.push(new LeakingClass());
  }
}
function leak2(){
   for (let i = 0; i < 500000; i++) {
    leaks.push(new LeakingClass());
  }
}
setInterval(function pushleak(){
  leak1();
  leak2();
  leak1();
  heapProfile.write((err, filename) => {
    console.log(`heapProfile.write. err: ${err} filename: ${filename}`);
  });
  console.warn("Leaks: %d", leaks.length);
}, 5000);
