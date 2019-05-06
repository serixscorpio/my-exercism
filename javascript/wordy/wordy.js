const operators = {
  plus: (n, m) => n + m,
  minus: (n, m) => n - m,
  "multiplied by": (n, m) => n * m,
  "divided by": (n, m) => n / m
};

export class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "ArgumentError";
  }
}

export class WordProblem {
  constructor(question) {
    this.question = question;
  }
  getNumber(mathQuestion) {
    this.removeSpace(mathQuestion);
    let result = /^-?\d+/.exec(mathQuestion.input);
    if (result === null)
      throw new ArgumentError("Expected a number, but didn't find one");
    mathQuestion.tokens.push(Number(result[0]));
    mathQuestion.input = mathQuestion.input.replace(result[0], "");
  }
  getOperator(mathQuestion) {
    this.removeSpace(mathQuestion);
    for (let key in operators) {
      if (new RegExp(`^${key}`).test(mathQuestion.input)) {
        mathQuestion.tokens.push(operators[key]);
        mathQuestion.input = mathQuestion.input.replace(key, "");
        return;
      }
    }
    throw new ArgumentError("Expected an operator, but didn't find one");
  }
  /*
   * Turns a string "What is 1 plus 1?" into an array [1, PlusFunction, 1]
   */
  tokenize() {
    if (!this.question.endsWith("?"))
      throw new ArgumentError("The question should end with '?'");
    if (!this.question.startsWith("What is"))
      throw new ArgumentError("The question should start with 'What is'");
    let mathQuestion = {
      input: /^What is(.*)\?$/.exec(this.question)[1],
      tokens: []
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.getNumber(mathQuestion);
      if (!mathQuestion.input) return mathQuestion.tokens;
      this.getOperator(mathQuestion);
    }
  }
  removeSpace(mathQuestion) {
    mathQuestion.input = mathQuestion.input.trim();
  }
  answer() {
    let tokens = this.tokenize();
    let answer = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
      let operatorFn = tokens[i];
      answer = operatorFn(answer, tokens[i + 1]);
    }
    return answer;
  }
}
