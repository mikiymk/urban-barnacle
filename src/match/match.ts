const matchObject = Symbol("match object");
const matchDefault = Symbol("default");

export const match = <T, U, Cs extends Case<T, U>[]>(value: T, ...cases: Cs): U => {
  let defaultExpression = undefined;
  for (const [pattern, expression] of cases) {
    if (matchPattern(value, pattern)) {
      return execute(value, expression);
    }
    if (pattern === matchDefault) {
      defaultExpression = expression;
    }
  }

  return execute(value, defaultExpression);
};

const matchPattern = <T, U>(value: T, pattern: Pattern<T, U>): value is U = {
  if (matchObject in pattern) {
    return pattern[matchObject](value);
  }

  return Object.is(value, pattern);
};

const execute = <T, U>(value: T, expression: Expression<T, U>): U => {
  if (typeof expression === "function") {
    return expression(value);
  }

  return expression;
};
