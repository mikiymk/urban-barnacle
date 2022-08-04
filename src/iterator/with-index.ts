export const withIndex = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  start = 0
): Generator<[number, T], TReturn, TNext> {
  let index = start;
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield [index, cur.value];
      index += 1;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
