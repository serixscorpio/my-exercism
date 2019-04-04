const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const resistors = COLORS.reduce((accumulator, color, index) => {
  accumulator[color] = index;
  return accumulator;
}, {});

const colorCode = (color) => resistors[color];

export { colorCode, COLORS };
