export const primeFactors = (number) => {
  const result = [];
  let remainingFactor = number;
  let i = 2;
  while (remainingFactor > 1) {
    if (remainingFactor % i === 0) {
      result.push(i);
      remainingFactor /= i;
    } else {
      i += 1;
    }
  }
  return result;
};
