export const stepBy = function* <T>(
  iterator: Iterator<T>,
  step: number
): Generator<T, void, undefined> {
  if (step <= 0) {
    throw new RangeError(`step is positive number but ${step}.`);
  }

  let cur = iterator.next();

  while (!cur.done) {
    yield cur.value;
    cur = iterator.next();

    // `step` times
    for (let index = 0; index < step - 1 && !cur.done; index += 1) {
      cur = iterator.next();
    }
  }
};
