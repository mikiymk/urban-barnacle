export function* stepBy<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, step: number): Generator<T, TReturn, TNext> {
  if (step <= 0) {
    throw new RangeError("argument[1] is positive number but " + step + ".");
  }

  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;

      // `step` times
      for (let i = 0; i < step && !cur.done; i++) {
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
