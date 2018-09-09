// 7 段共阳数码管
const Gpio = require('onoff').Gpio;

/**
 *      1
 *    _ _ _
 *  6 |   | 2
 *    | 7 |
 *    - - -
 *  5 |   | 3
 *    |   |
 *    - - - . 8
 *      4
 * 0 -> 00000011
 * 1 -> 10011111
 * 2 -> 00100101
 * 3 -> 00001101
 * 4 -> 10011001
 * 5 -> 01001001
 * 6 -> 01000001
 * 7 -> 00011111
 * 8 -> 00000001
 * 9 -> 00001001
*/

let leds = [22, 10, 25, 12, 20, 27, 17, 21]
let num = ['00000011', '10011111', '00100101', '00001101', '10011001', '01001001', '01000001', '00011111', '00000001', '00001001']

function sleep(mis) {
  return new Promise(res => setTimeout(res, mis));
}

let idx = 0;
async function show() {
  for (let n in num[idx]) {
    let l = new Gpio(leds[n], 'out');
    l.writeSync(parseInt(num[idx][n]));
  }

  await sleep(1000);
  show(idx++)

  if (idx === leds.length + 1) {
    idx = 0;
    num.reverse();
  }
}

show();