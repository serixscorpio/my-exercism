const nameGen = {
  randomName() {
    return `${this.randomLetter()}${this.randomLetter()}${this.randomDigit()}${this.randomDigit()}${this.randomDigit()}`;
  },
  randomDigit(max = 10) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  randomLetter() {
    return String.fromCharCode(65 + this.randomDigit(26));
  },
};

const robotNameGen = Object.assign(Object.create(nameGen), {
  init() {
    this.usedNames = new Set();
  },
  nextUniqueName() {
    while (true) {
      const name = this.randomName();
      if (!this.usedNames.has(name)) {
        this.usedNames.add(name);
        return name;
      }
    }
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

export function Robot() {
  const robot = Object.create(protoRobot());
  robot.reset();
  return robot;
}
