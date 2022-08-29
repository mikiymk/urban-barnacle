import { toIterable } from "../consumer/to-iterable";

export const chain = function* <T>(
  ...iterators: Iterator<T>[]
): Generator<T, void, undefined> {
  for (const iterator of iterators) {
    for (const value of toIterable(iterator)) {
      yield value;
    }
  }
};
