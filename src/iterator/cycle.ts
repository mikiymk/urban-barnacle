export const cycle = function* <T, TNext>(
  iterator: Iterator<T, unknown, TNext>
): Generator<T, never, TNext> {
  let cur = iterator.next();
  const values = [];

  while (!cur.done) {
    try {
      values.push(cur.value);
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  while (true) {
    for (const value of values) {
      try {
        yield value;
      } catch (error) {
        iterator.throw?.(error);
      }
    }
  }
};
