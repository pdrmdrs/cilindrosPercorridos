'use scrict';

const fs = require('fs');

/**
 * Object that represents the initial default config values
 */
const config = {
  initialPosition: 0,
  waitQueueSize: 0,
  waitQueue: []
};

/**
 * The main function of the app
 */
const main = () => {
  if (process.argv.length > 2){
    populateConfig(readConfigFile(process.argv[2]));
    runSchedulingAlgorithms();
  } else {
    console.log('No config file name passed as argument.');
  }
}

/**
 * Function that reads each line of the config file
 * @param { String } fileName the name of the config file
 * @returns an array containing each line
 */
const readConfigFile = (fileName = '') => {
  const content = fs.readFileSync(`./${fileName}`, 'utf8');
 
  const fileAsArrayPerLine = content.split('\n');

  return fileAsArrayPerLine;
};

/**
 * Function that read an array of lines and populate the config object with the desired params
 * @param { Array } lines the lines of the file
 */
const populateConfig = (lines = []) => {
  Object.assign(config, {
    initialPosition: lines[0].trim('\r'),
    waitQueueSize: lines[1].trim('\r'),
    waitQueue: lines[2].split(' ')
  });
};

/**
 * Function that runs each scheduling algorithm
 */
const runSchedulingAlgorithms = () => {
  FCFS();
  SSTF();
  SCAN_SOBE();
  SCAN_DESCE();
};

/**
 * FCFS scheduling algorithm
 * First Come, First Serve
 */
const FCFS = () => {
  const order = [config.initialPosition, ...config.waitQueue];
  const cilinders = countCilinders(order);

  printSchedulingAlgorithm('FCFS', order, cilinders);
};

/**
 * SSTF scheduling algorithm
 */
const SSTF = () => {

  const findShortestToSeek = (actual = 0, queue = [], positionToStart = 0) => {
    let shortestToSeekIndex = -1;

    let distance = -1;

    for(let i = positionToStart; i < queue.length; i++) {

      let newDistance = (actual - queue[i]);

      if(newDistance < 0) {
        newDistance = newDistance * (-1);
      }

      if(newDistance > distance) {
        shortestToSeekIndex = i;
        distance = newDistance;
      }
    }

    return queue[shortestToSeekIndex];
  };

  const order = [config.initialPosition];

  for(let i = 0; i < config.waitQueue.length; i++) {
    order.push(findShortestToSeek(order[i], config.waitQueue, i));
  }

  const cilinders = countCilinders(order);;

  printSchedulingAlgorithm('SSTF', order, cilinders);
};

/**
 * SCAN_SOBE scheduling algorithm
 */
const SCAN_SOBE = () => {
  const order = [config.initialPosition];
  const cilinders = 0;

  printSchedulingAlgorithm('SCAN_SOBE', order, cilinders);
};

/**
 * SCAN_DESCE scheduling algorithm
 */
const SCAN_DESCE = () => {
  const order = [config.initialPosition];
  const cilinders = 0;

  printSchedulingAlgorithm('SCAN_DESCE', order, cilinders);
};

const countCilinders = (order = []) => {

  let cilinders = 0;

  for(let i = 1; i < order.length; i++) {
    let cilinderStep = (order[i] - order[i - 1]);

    if (cilinderStep < 0) {
      cilinderStep = cilinderStep * (-1);
    } 

    cilinders += cilinderStep;
  }

  return cilinders;
}


const printSchedulingAlgorithm = (name = '', order = [], cilinders = '') => {
  console.log(name);
  console.log(`\tOrdem: ${order.join(', ')}`);
  console.log(`\tCilindros: ${cilinders}`);
};

// run main
main();
