export const intersperse = function* <T, TNext, TReturn>(
  iterator: Iterator<T, TNext, TReturn>,
  separator: T
): Generator<T, TNext, TReturn> {
  let cur = iterator.next();

  if (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  while (!cur.done) {
    try {
      yield separator;
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
