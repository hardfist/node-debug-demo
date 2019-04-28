function a(){
  b()
}
function b(){
  c()
}
function c(){
  console.log(new Error().stack)
}
a()