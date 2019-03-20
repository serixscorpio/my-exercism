const nameGen = {
  randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
};

const CHAR_START = 65;
const CHAR_RANGE = 26;
const DIGIT_START = 48;
const DIGIT_RANGE = 10;

const robotNameGen = Object.assign(Object.create(nameGen), {
  init() {
    this.namePool = [];
    for (let char1 = CHAR_START; char1 < CHAR_START + CHAR_RANGE; char1 += 1) {
      for (let char2 = CHAR_START; char2 < CHAR_START + CHAR_RANGE; char2 += 1) {
        for (let digit1 = DIGIT_START; digit1 < DIGIT_START + DIGIT_RANGE; digit1 += 1) {
          for (let digit2 = DIGIT_START; digit2 < DIGIT_START + DIGIT_RANGE; digit2 += 1) {
            for (let digit3 = DIGIT_START; digit3 < DIGIT_START + DIGIT_RANGE; digit3 += 1) {
              this.namePool.push(String.fromCharCode(char1, char2, digit1, digit2, digit3));
            }
          }
        }
      }
    }
    this.releaseNames();
  },
  nextUniqueName() {
    if (this.numNamesAvailable === 0) {
      throw new Error('No more name avaiable');
    }
    const randomlySelectedIndex = this.randomNumber(this.numNamesAvailable);
    const lastAvailableIndex = (this.numNamesAvailable -= 1);
    const pickedName = this.namePool[randomlySelectedIndex];
    this.namePool[randomlySelectedIndex] = this.namePool[lastAvailableIndex];
    this.namePool[lastAvailableIndex] = pickedName;
    return pickedName;
  },
  releaseNames() {
    this.numNamesAvailable = this.namePool.length;
  },
});

robotNameGen.init();

const protoRobot = () => {
  let name = null;
  return {
    reset() {
      name = robotNameGen.nextUniqueName();
    },
    get name() {
      return name;
    },
    set name(_) {
      throw new Error();
    },
  };
};

export const Robot = () => {
  const robot = Object.create(protoRobot());
  robot.reset();
  return robot;
};

Robot.releaseNames = () => {
  robotNameGen.releaseNames();
};
