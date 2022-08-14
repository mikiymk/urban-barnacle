const matchObject = Symbol("match object");
const matchDefault = Symbol("default");

export const match = <T, U, Cs extends Case<T, U>[]>(value: T, ...cases: Cs): U => {
  let defaultExpression = undefined;
  for (const case of cases) {
    if (case.length === 1) {
      [defaultExpression] = case;
    } else {
      const [pattern, expression] = case;
      if (matchPattern(value, pattern)) {
        return execute(value, expression);
      }
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

const objectPatternCase = (pattern) => ({
  [matchObject]: (value) => objectPattern(value, pattern),
});

const objectPattern = (value, pattern) => {
  for (const [patternKey, patternValue] of Object.entries(pattern)) {
    if (!(patternKey in value)) return false;

    let isMatch = false;
    if (typeof patternValue === "object" && !(matchObject in patternValue)) {
      isMatch = objectPattern(value[patternKey], patternValue);
    } else {
      isMatch = matchPattern(value[patternKey], patternValue);
    }

    if (!isMatch) return false;
  }

  return true;
};
