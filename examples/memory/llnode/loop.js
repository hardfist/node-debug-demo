const Koa = require("koa");
const Router = require("koa-router");
const { JSDOM } = require("jsdom");
const app = new Koa();
const router = new Router();
router.get("/jsdom", async function jsdomHandler(ctx, next){
  const content = Math.random()
    .toString(36)
    .repeat(10000000);
  const root = new JSDOM(content);
  ctx.body = root
});
router.get('/redos', async function redosHandler(ctx,next){
  const  r = /([a-z]+)+$/
  const  s = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!'
  r.test(s);
})
router.get("/loop", async function loop_handle(ctx,next) {
  class MyRecord {
    constructor() {
      this.name = "foo";
      this.id = 128;
      this.account = 98454324;
    }
  }
  const list = [];
  for (let i = 0; i < 10000000000; i++) {
    for (const j = 0; i < 1000; i++) {
      list.push(new MyRecord());
    }
    for (const j = 0; i < 1000; i++) {
      list[j].id += 1;
      list[j].account += 2;
    }
    for (const j = 0; i < 1000; i++) {
      list.pop();
    }
  }
});
router.get('/', async function mainHandle(ctx,next) {
  ctx.body = `
  <a href="/loop">loop</a>
  <a href="/jsdom">jsdom</a>
  <a href="/redos">redos</a>
  `
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log(`pid: ${process.pid} listen at http://localhost:3000`);
});