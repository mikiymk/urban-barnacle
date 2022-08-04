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

  let valueCollector = [prev.value];
  while (!cur.done && groupByFunction(prev.value, cur.value)) {
    valueCollector.push(cur.value);
    prev = cur;
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield valueCollector;

      valueCollector = [];
      while (!cur.done && groupByFunction(prev.value, cur.value)) {
        valueCollector.push(cur.value);
        prev = cur;
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  yield valueCollector;
  return cur.value;
};
