export const stepBy = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  step: number
): Generator<T, TReturn, TNext> {
  if (step <= 0) {
    throw new RangeError(`argument[1] is positive number but ${step}.`);
  }

  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;

      // `step` times
      for (let index = 0; index < step && !cur.done; index += 1) {
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
