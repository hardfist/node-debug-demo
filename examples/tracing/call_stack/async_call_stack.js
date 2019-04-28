function a(){
  setTimeout(crash,1000);
}
function b(){
  setTimeout(crash, 1000);
}
function crash () {
  console.log(new Error().stack)
}

a()