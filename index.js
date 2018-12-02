'use scrict';

const fs = require('fs');

/**
 * Object that represents the initial default config values
 */
const config = {
  initialPosition: 0,
  waitQueueSize: 0,
  waitQueue: [],
  minSector: 0,
  maxSector: 199
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
    initialPosition: parseInt(lines[0].trim('\r')),
    waitQueueSize: parseInt(lines[1].trim('\r')),
    waitQueue: lines[2].split(' ').map(Number)
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

  const partialOrder = [...config.waitQueue];
  
  const order = [];

  order.push(config.initialPosition);

  
  for(let i = 0; i < config.waitQueueSize; i++) {

    let minorDistance = null;
    let nextToSeek = null;

    for(let j = 0; j < partialOrder.length; j++) {
      
      let d = order[i] - partialOrder[j];
      
      if (d < 0) {
        d = d * (-1);
      }

      if (!minorDistance || d < minorDistance) {
        minorDistance = d;
        nextToSeek = partialOrder[j];
      }
      
    }

    order.push(nextToSeek);

    const indexOfNextToSeek = partialOrder.indexOf(nextToSeek);

    if (indexOfNextToSeek > -1) {
      partialOrder.splice(indexOfNextToSeek, 1);
    }

  }

  const cilinders = countCilinders(order);

  printSchedulingAlgorithm('SSTF', order, cilinders);
};

/**
 * SCAN_SOBE scheduling algorithm
 */
const SCAN_SOBE = () => {
  const order = [config.initialPosition];

  const partialOrder = [config.initialPosition, ...config.waitQueue];

  let hasReachedMinPosition = false;

  for(let i = 0; i < config.waitQueue.length; i++) {

    let value = !hasReachedMinPosition ? findNextMin(order[i], partialOrder) : findNextMax(order[i], partialOrder);

    if(!value) {
      hasReachedMinPosition = !hasReachedMinPosition;

      value = findNextMax(order[i], partialOrder);
    }

    if (value) {
      order.push(value);
      // partialOrder.splice(partialOrder.indexOf(value), 1);
    }
  }

  const cilinders = countCilinders(order);

  printSchedulingAlgorithm('SCAN_SOBE', order, cilinders);
};

/**
 * SCAN_DESCE scheduling algorithm
 */
const SCAN_DESCE = () => {
  const order = [config.initialPosition];

  const partialOrder = [config.initialPosition, ...config.waitQueue];

  let hasReachedMaxPosition = false;

  for(let i = 0; i < config.waitQueue.length; i++) {

    let value = !hasReachedMaxPosition ? findNextMax(order[i], partialOrder) : findNextMin(order[i], partialOrder);

    if(!value) {
      hasReachedMaxPosition = !hasReachedMaxPosition;

      value = findNextMin(order[i], partialOrder);
    }

    if (value) {
      order.push(value);
      // partialOrder.splice(partialOrder.indexOf(value), 1);
    }
  }

  const cilinders = countCilinders(order);
  printSchedulingAlgorithm('SCAN_DESCE', order, cilinders);
};

const findNextMin = (value = 0, array = []) => {
  const sortedArray = array.sort((a, b) => a-b);

  const index = sortedArray.indexOf(parseInt(value));

  const nextMin = sortedArray[index - 1];

  return nextMin;
};

const findNextMax = (value = 0, array = []) => {
  const sortedArray = array.sort((a, b) => a-b);

  const index = sortedArray.indexOf(parseInt(value));

  const nextMax = sortedArray[index + 1];

  return nextMax;
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
