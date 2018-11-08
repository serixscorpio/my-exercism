export const proverb = (...args) => {
  const { length } = args;
  const { qualifier } = args[length - 1];
  const phrases = [];
  for (let i = 0; ; i += 1) {
    if (i === length - 2 && qualifier) {
      phrases.push(`And all for the want of a ${qualifier} ${args[0]}.`);
      break;
    }
    if (i === length - 1) {
      phrases.push(`And all for the want of a ${args[0]}.`);
      break;
    }
    phrases.push(`For want of a ${args[i]} the ${args[i + 1]} was lost.`);
  }
  return phrases.join('\n');
};
