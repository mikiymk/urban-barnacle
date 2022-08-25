import { identity } from "./identity";

export const cycle = function* <T>(
  iterator: Iterator<T>
): Generator<T, never, undefined> {
  const values = [];

  for (const value of identity(iterator)) {
    values.push(value);
    yield value;
  }

  while (true) {
    for (const value of values) {
      yield value;
    }
  }
};
