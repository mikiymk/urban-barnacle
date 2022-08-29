import { toIterable } from "../consumer/to-iterable";

export const cycle = function* <T>(
  iterator: Iterator<T>
): Generator<T, never, undefined> {
  const values = [];

  for (const value of toIterable(iterator)) {
    values.push(value);
    yield value;
  }

  while (true) {
    for (const value of values) {
      yield value;
    }
  }
};
