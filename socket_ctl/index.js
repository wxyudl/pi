const fs = require('fs');
const path = require('path');
const Gpio = require('onoff').Gpio;
const Koa = require('koa');
const IO = require('koa-socket-2');
const app = new Koa();
const pi = new IO('pi');
let leds = [17, 27, 22, 10, 9, 11, 19];

pi.attach(app);

/**
 * Koa Middlewares
 */
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


/**
 * App handlers
 */
app.use(ctx => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'))
});

/**
 * Socket middlewares
 */
pi.use(async (ctx, next) => {
  console.log('Socket middleware');
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`WS ${ms}ms`);
});


/**
 * PI handlers
 */
pi.on('connection', ctx => {
  console.log('Joining pi namespace', ctx.socket.id);
});

pi.on('message', ctx => {
  console.log('pi message received', ctx.data);
  new Gpio(leds[ctx.data[0] - 1], 'high').writeSync(ctx.data[1]);

  // Emits to just this socket
  ctx.socket.emit('message', 'ok connections:pi:emit');
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on ${PORT}`);
});