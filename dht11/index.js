var rpiDhtSensor = require('rpi-dht-sensor');
const Gpio = require('onoff').Gpio;
var dht = new rpiDhtSensor.DHT11(16);

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
 * 0 -> 0000001
 * 1 -> 1001111
 * 2 -> 0010010
 * 3 -> 0000110
 * 4 -> 1001100
 * 5 -> 0100100
 * 6 -> 0100000
 * 7 -> 0001111
 * 8 -> 0000000
 * 9 -> 0000100
*/

let leds1 = [22, 10, 25, 12, 20, 27, 17];
let leds2 = [2, 3, 4, 18, 23, 24, 8];
let led3 = [7, 5, 6, 13, 19];
let num = ['0000001', '1001111', '0010010', '0000110', '1001100', '0100100', '0100000', '0001111', '0000000', '0000100']

async function showTemp() {
  var readout = dht.read();
  console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
    'humidity: ' + readout.humidity.toFixed(2) + '%');
  let temperature = readout.temperature.toFixed().toString()
  let led1 = num[temperature[0]];
  let led2 = num[temperature[1]];

  for (let n1 in led1) {
    let l = new Gpio(leds1[n1], 'out');
    l.writeSync(parseInt(led1[n1]));
  }

  for (let n2 in led2) {
    let l = new Gpio(leds2[n2], 'out');
    l.writeSync(parseInt(led2[n2]));
  }

  for (let n3 in led3) {
    let l = new Gpio(led3[n3], 'out');
    l.writeSync(0);
  }

  setTimeout(showTemp, 1000);
}

showTemp();

