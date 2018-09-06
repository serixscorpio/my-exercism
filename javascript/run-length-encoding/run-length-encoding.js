export function encode(input) {
  let currChar = null;
  let currCharCount = 0;
  const encodedFragments = [];
  for (let i = 0; i < input.length; i += 1) {
    if (currChar !== input[i]) {
      currChar = input[i];
      currCharCount = 1;
      encodedFragments.push(currChar);
    } else {
      currCharCount += 1;
      encodedFragments[encodedFragments.length - 1] = currCharCount + currChar;
    }
  }
  return encodedFragments.join('');
}

export function decode(input) {
  function reducePairs(accumulator, currentPair) {
    return accumulator + currentPair.char.repeat(currentPair.runLength);
  }

  function isDigit(char) {
    return isNaN(parseInt(char, 10));
  }

  const runLengthPairs = [];
  for (let i = 0; i < input.length; i += 1) {
    if (isDigit(input[i])) {
      runLengthPairs.push({ runLength: 1, char: input[i] });
    } else {
      for (let runLengthStart = i; ;) {
        i += 1;
        if (isDigit(input[i])) {
          runLengthPairs.push({ runLength: input.substring(runLengthStart, i), char: input[i] });
          break;
        }
      }
    }
  }
  return runLengthPairs.reduce(reducePairs, '');
}
