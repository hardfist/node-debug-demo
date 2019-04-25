// for more info about ReDoS, see:
// https://en.wikipedia.org/wiki/ReDoS

var r = /([a-z]+)+$/
var s = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!'

console.log('Running regular expression... please wait')
for(let i=1;i<100000;i++){
  if(i === 30){
    break;
  }
  console.time('benchmark');
  const s = 'a'.repeat(i) + '!'
  
  r.test(s);
  console.timeEnd('benchmark');
}
