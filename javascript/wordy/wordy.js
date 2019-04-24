const plus = (n, m) => n + m;
const minus = (n, m) => n - m;
const multipliedBy = (n, m) => n * m;
const dividedBy = (n, m) => n / m;

export class ArgumentError {}

export class WordProblem {
  constructor(question) {
    this.question = question;
  }
  getNumber(mathQuestion) {
    this.removeSpace(mathQuestion);
    let result = /^-?\d+/.exec(mathQuestion.input);
    if (result === null)
      throw new ArgumentError("Expected a number, but didn't find one");
    mathQuestion.expression.push(Number(result[0]));
    mathQuestion.input = mathQuestion.input.replace(result[0], "");
  }
  getOperator(mathQuestion) {
    this.removeSpace(mathQuestion);
    const operators = {
      plus,
      minus,
      "multiplied by": multipliedBy,
      "divided by": dividedBy
    };
    for (let key in operators) {
      if (new RegExp(`^${key}`).test(mathQuestion.input)) {
        mathQuestion.expression.push(operators[key]);
        mathQuestion.input = mathQuestion.input.replace(key, "");
        return;
      }
    }
    throw new ArgumentError("Expected an operator, but didn't find one");
  }
  tokenize() {
    if (!this.question.endsWith("?"))
      throw new ArgumentError("The question should end with '?'");
    if (!this.question.startsWith("What is "))
      throw new ArgumentError("The question should start with 'What is'");
    let mathQuestion = {
      input: this.question.substring(7, this.question.length - 1),
      expression: []
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.getNumber(mathQuestion);
      if (mathQuestion.input) {
        this.getOperator(mathQuestion);
      } else {
        return mathQuestion.expression;
      }
    }
  }
  removeSpace(mathQuestion) {
    mathQuestion.input = mathQuestion.input.trim();
  }
  answer() {
    let expression = this.tokenize();
    let lhs = expression[0];
    let operatorFn = null;
    for (let i = 1; i < expression.length; i += 1) {
      switch (typeof expression[i]) {
        case "function":
          operatorFn = expression[i];
          break;
        case "number":
          lhs = operatorFn(lhs, expression[i]);
          break;
      }
    }
    return lhs;
  }
}
