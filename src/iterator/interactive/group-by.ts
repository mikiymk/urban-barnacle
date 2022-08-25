export const groupBy = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  groupByFunction: (previous: T, current: T) => boolean
): Generator<T[], TReturn, TNext> {
  let prev = iterator.next();
  if (prev.done) {
    // Iterator has no value
    return prev.value;
  }

  let cur = iterator.next();

  let valueCollector = [];
  while (!cur.done) {
    valueCollector.push(prev.value);

    let next = undefined;
    if (!groupByFunction(prev.value, cur.value)) {
      try {
        next = yield valueCollector;
      } catch (error) {
        iterator.throw?.(error);
      }
      valueCollector = [];
    }

    prev = cur;
    if (next === undefined) {
      cur = iterator.next();
    } else {
      cur = iterator.next(next);
    }
  }

  valueCollector.push(prev.value);
  yield valueCollector;
  return cur.value;
};
