import { identity } from "./identity";

export const chain = function* <T>(
  ...iterators: Iterator<T>[]
): Generator<T, void, undefined> {
  for (const iterator of iterators) {
    for (const value of identity(iterator)) {
      yield value;
    }
  }
};
