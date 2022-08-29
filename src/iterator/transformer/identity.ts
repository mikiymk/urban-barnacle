import { toIterable } from "../consumer/to-iterable";

export const identity = function* <T>(
  iterator: Iterator<T>
): Generator<T, void, undefined> {
  for (const value of toIterable(iterator)) {
    yield value;
  }
};
