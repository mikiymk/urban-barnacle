export const chain = function* <T, TRetuen, TNext>(
  iterator1: Iterator<T, TRetuen, TNext>,
  ...iterators: Iterator<T, TRetuen, TNext>[]
): Generator<T, TRetuen, TNext> {
  let cur = iterator1.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator1.next(next);
    } catch (error) {
      iterator1.throw?.(error);
    }
  }

  let returnValue = cur.value;

  for (const iterator of iterators) {
    cur = iterator.next();

    while (!cur.done) {
      try {
        const next = yield cur.value;
        cur = iterator.next(next);
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    returnValue = cur.value;
  }

  return returnValue;
};
