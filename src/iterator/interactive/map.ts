export const map = function* <T, U, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  mapFunction: (value: T) => U
): Generator<U, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield mapFunction(cur.value);
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
