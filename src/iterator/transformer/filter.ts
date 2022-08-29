import { toIterable } from "../consumer/to-iterable";

export const filter = function* <T>(
  iterator: Iterator<T>,
  filterFunction: (value: T) => boolean
): Generator<T, void, undefined> {
  for (const value of toIterable(iterator)) {
    if (filterFunction(value)) {
      yield value;
    }
  }
};
