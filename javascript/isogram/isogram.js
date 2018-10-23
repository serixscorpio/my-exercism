export default class Isogram {
  constructor(word) {
    this.word = word;
  }

  isIsogram() {
    const wordWithOnlyAlphabet = this.word.replace(/[^a-zA-Z]/g, '');
    return wordWithOnlyAlphabet.length === new Set(wordWithOnlyAlphabet.toLowerCase()).size;
  }
}
