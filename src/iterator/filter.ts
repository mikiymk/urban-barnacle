export const filter = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  filterFunction: (value: T) => boolean
): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      if (filterFunction(cur.value)) {
        const next = yield cur.value;
        cur = iterator.next(next);
      } else {
        cur = iterator.next();
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
