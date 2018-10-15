export function isPangram(sentence) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const hasSeen = [...alphabet].reduce((accumulator, letter) => {
    accumulator[letter] = false;
    return accumulator;
  }, {});
  let numUniqueLettersSeen = 0;
  for (let letter of sentence.toLowerCase()) {
    if (hasSeen[letter] === false) {
      hasSeen[letter] = true;
      numUniqueLettersSeen += 1;
      if (numUniqueLettersSeen === alphabet.length) return true;
    }
  }
  return false;
}
