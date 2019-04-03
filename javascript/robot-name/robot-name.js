const nameGen = {
  randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
};

const LETTERS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const robotNameGen = Object.assign(Object.create(nameGen), {
  init() {
    this.namePool = [];
    LETTERS.forEach((a) => {
      LETTERS.forEach((b) => {
        DIGITS.forEach((c) => {
          DIGITS.forEach((d) => {
            DIGITS.forEach((e) => {
              this.namePool.push([a, b, c, d, e].join(''));
            });
          });
        });
      });
    });
    this.releaseNames();
  },
  nextUniqueName() {
    if (this.nextUniqueNameIndex === this.namePool.length) {
      throw new Error('No more name available');
    }
    const pickedName = this.namePool[this.nextUniqueNameIndex];
    this.nextUniqueNameIndex += 1;
    return pickedName;
  },
  releaseNames() {
    // modern vesion of Fisher-Yates shuffle
    for (let i = this.namePool.length - 1; i > 0; i -= 1) {
      const j = this.randomNumber(i);
      [this.namePool[j], this.namePool[i]] = [this.namePool[i], this.namePool[j]];
    }
    this.nextUniqueNameIndex = 0;
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
