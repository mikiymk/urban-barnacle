export const takeCount = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  length: number
): Generator<T, T | TReturn, TNext> {
  let cur = iterator.next();

  for (let index = 0; index < length && !cur.done; index += 1) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};

export const takeWhile = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  takeWhileFunction: (value: T) => boolean
): Generator<T, T | TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      if (!takeWhileFunction(cur.value)) {
        break;
      }
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};

export const take = <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  condition: number | ((value: T) => boolean)
): Generator<T, T | TReturn, TNext> => {
  if (typeof condition === "number") {
    // Count condition
    return takeCount(iterator, condition);
  }
  // Function condition (like filter)
  return takeWhile(iterator, condition);
};
