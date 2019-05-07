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
    mathQuestion.input = mathQuestion.input.trimStart();
    const result = /^-?\d+/.exec(mathQuestion.input);
    if (result === null)
      throw new ArgumentError("Expected a number, but didn't find one");
    mathQuestion.tokens.push(Number(result[0]));
    mathQuestion.input = mathQuestion.input.replace(result[0], "");
  }
  getOperator(mathQuestion) {
    mathQuestion.input = mathQuestion.input.trimStart();
    const result = new RegExp(`^${Object.keys(operators).join("|")}`).exec(
      mathQuestion.input
    );
    if (result === null)
      throw new ArgumentError("Expected an operator, but didn't find one");
    mathQuestion.tokens.push(operators[result[0]]);
    mathQuestion.input = mathQuestion.input.replace(result[0], "");
  }
  /*
   * Turns a string "What is 1 plus 1?" into an array [1, PlusFunction, 1]
   */
  answer() {
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
      if (!mathQuestion.input) break;
      this.getOperator(mathQuestion);
    }
    const tokens = mathQuestion.tokens;
    let answer = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
      let operatorFn = tokens[i];
      answer = operatorFn(answer, tokens[i + 1]);
    }
    return answer;
  }
}
