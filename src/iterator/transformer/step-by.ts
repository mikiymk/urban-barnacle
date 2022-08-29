import { toIterable } from "../consumer/to-iterable";

export const stepBy = function* <T>(
  iterator: Iterator<T>,
  step: number
): Generator<T, void, undefined> {
  if (step <= 0) {
    throw new RangeError(`step is positive number but ${step}.`);
  }

  let count = 0;
  for (const value of toIterable(iterator)) {
    if (count) {
      // `step` times
      count -= 1;
    } else {
      count = step - 1;
      yield value;
    }
  }
};
