async function foo() {
  await bar();
  return 42;
}

async function bar() {
  await Promise.resolve();
  throw new Error('BEEP BEEP');
}

function a(){
  setTimeout(() => {
    b();
  })
}
function b(){
  setTimeout(() => {
    const err = new Error();
    console.log('err:', err.stack);
  });
}
foo().catch(error => console.log(error.stack));
a();