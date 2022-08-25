export const dropCount = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  length: number
): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  for (let index = 0; !cur.done && index < length; index += 1) {
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};

export const dropWhile = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  dropWhileFunction: (value: T) => boolean
): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done && dropWhileFunction(cur.value)) {
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};

export const drop = <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  condition: number | ((value: T) => boolean)
): Generator<T, TReturn, TNext> => {
  if (typeof condition === "number") {
    // Count condition
    return dropCount(iterator, condition);
  }
  // Function condition (like filter)
  return dropWhile(iterator, condition);
};
