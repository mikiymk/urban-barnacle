import { toIterable } from "../consumer/to-iterable";

export const withIndex = function* <T>(
  iterator: Iterator<T>,
  start = 0
): Generator<[number, T], void, undefined> {
  let index = start;

  for (const value of toIterable(iterator)) {
    yield [index, value];
    index += 1;
  }
};
