import { identity } from "./identity";

export const groupBy = function* <T>(
  iterator: Iterator<T>,
  groupByFunction: (previous: T, current: T) => boolean
): Generator<T[], void, undefined> {
  const prev = iterator.next();
  if (prev.done) {
    // Iterator has no value
    return;
  }

  let prevValue = prev.value;
  let valueCollector = [prevValue];
  for (const value of identity(iterator)) {
    if (!groupByFunction(prevValue, value)) {
      yield valueCollector;
      valueCollector = [];
    }
    valueCollector.push(value);
    prevValue = value;
  }

  yield valueCollector;
};
