export const stepBy = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  step: number
): Generator<T, TReturn, TNext> {
  if (step <= 0) {
    throw new RangeError(`step is positive number but ${step}.`);
  }

  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }

    // `step` times
    for (let index = 0; index < step - 1 && !cur.done; index += 1) {
      cur = iterator.next();
    }
  }

  return cur.value;
};
