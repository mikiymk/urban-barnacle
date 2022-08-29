import { toIterable } from "../consumer/to-iterable";

export const intersperse = function* <T>(
  iterator: Iterator<T>,
  separator: T
): Generator<T, void, undefined> {
  const cur = iterator.next();
  if (!cur.done) {
    yield cur.value;
  }

  for (const value of toIterable(iterator)) {
    yield separator;
    yield value;
  }
};
