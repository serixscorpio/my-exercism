export function isPangram(sentence) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const hasSeen = [...alphabet].reduce((accumulator, letter) => {
    accumulator[letter] = false;
    return accumulator;
  }, {});
  let numUniqueLettersSeen = 0;
  for (let i = 0; i < sentence.length; i += 1) {
    const letter = sentence[i].toLowerCase();
    if (hasSeen[letter] === false) {
      hasSeen[letter] = true;
      numUniqueLettersSeen += 1;
    }
    if (numUniqueLettersSeen === alphabet.length) return true;
  }
  return false;
}
