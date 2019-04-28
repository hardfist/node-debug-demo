require('heapdump')
const leaks = [];

class LeakingClass {
  constructor() {
    this.name = Math.random().toString(36);
    this.age = Math.floor(Math.random() * 100);
  }
}

setInterval(function pushleak(){
  for (let i = 0; i < 100; i++) {
    leaks.push(new LeakingClass());
  }
  console.warn("Leaks: %d", leaks.length);
}, 100);
