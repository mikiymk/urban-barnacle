/**
 * Provide number increments
 * @param start counting first value
 * @returns new iterator
 */
export const countUp = function* (start = 0, step = 1): Generator<number> {
  let count = start;
  while (true) {
    yield count;
    count += step;
  }
};
