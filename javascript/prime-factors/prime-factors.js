export const primeFactors = (number) => {
  const result = [];
  let remainingFactor = number;
  for (let i = 2; remainingFactor !== 1;) {
    if (remainingFactor % i === 0) {
      result.push(i);
      remainingFactor /= i;
    } else {
      i += 1;
    }
  }
  return result;
};
