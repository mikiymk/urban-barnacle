import { identity } from "./identity";

export const intersperse = function* <T>(
  iterator: Iterator<T>,
  separator: T
): Generator<T, void, undefined> {
  const cur = iterator.next();
  if (!cur.done) {
    yield cur.value;
  }

  for (const value of identity(iterator)) {
    yield separator;
    yield value;
  }
};
