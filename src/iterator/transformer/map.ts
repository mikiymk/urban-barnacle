import { toIterable } from "../consumer/to-iterable";

export const map = function* <T, U>(
  iterator: Iterator<T>,
  mapFunction: (value: T) => U
): Generator<U, void, undefined> {
  for (const value of toIterable(iterator)) {
    yield mapFunction(value);
  }
};
