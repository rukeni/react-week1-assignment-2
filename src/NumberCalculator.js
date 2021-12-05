// eslint-disable-next-line max-classes-per-file
import { isNumeric } from './isNumeric';

class Result {
  /**
   *
   * @param before {number}
   * @param op {string}
   * @param current {number}
   * @param display {number}
   */
  constructor(before, op, current, display) {
    this.before = before;
    this.op = op;
    this.current = current;
    this.display = display;
  }
}

// eslint-disable-next-line import/prefer-default-export
export class NumberCalculator {
  static EXPR_1 = new NumberCalculator(
    (num1, op, num2) => isNumeric(num1) && !!op && isNumeric(num2),
    (num1, op, num2, click) => {
      const sum = Number(`${num2}${click}`);
      return new Result(num1, op, sum, sum);
    },
  );

  static EXPR_2 = new NumberCalculator((num1, op) => isNumeric(num1) && !!op,
    (num1, op, num2, click) => new Result(num1, op, click, click));

  static EXPR_3 = new NumberCalculator((num1) => isNumeric(num1),
    (num1, op, num2, click) => {
      const sum = Number(`${num1}${click}`);
      return new Result(sum, op, undefined, sum);
    });

  static EXPR_4 = new NumberCalculator(() => true,
    (num1, op, num2, click) => new Result(click, undefined, undefined, click));

  static values = [this.EXPR_1, this.EXPR_2, this.EXPR_3, this.EXPR_4];

  /**
   *
   * @param isFunc {Function}
   * @param calFunc {Function}
   */
  constructor(isFunc, calFunc) {
    this.isFunc = isFunc;
    this.calFunc = calFunc;
  }

  /**
   *
   * @param operand1: {number}
   * @param operator: {string}
   * @param operand2: {number}
   * @param clickNumber: {number}
   * @returns {Result}
   */
  static calculate(operand1, operator, operand2, clickNumber) {
    return this.values
      .find((e) => e.isFunc(operand1, operator, operand2, clickNumber))
      .calFunc(operand1, operator, operand2, clickNumber);
  }
}
