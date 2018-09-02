const Gpio = require('onoff').Gpio;

let leds = [17, 27, 22, 10, 9, 11, 19];

function sleep(mis) {
  return new Promise(res => setTimeout(res, mis));
}

async function close() {
  for (let led of leds) {
    let l = new Gpio(led, 'low');
    await sleep(1000);
    l.writeSync(1);
  }
}

close();

// 跑马灯
function lite(idx) {
  // 只要 new 就会 `高`
  let l = new Gpio(leds[idx], 'out');
  console.info('GPIO: ' + leds[idx] + ', Value: ' + l.readSync());
  console.info('Value after: ' + l.readSync());

  setTimeout(() => {
    l.writeSync(1);
    idx++;

    if (idx == leds.length) {
      idx = 1;
      leds.reverse();
    }

    lite(idx);
  }, 200);
}

// lite(0);