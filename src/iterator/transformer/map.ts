import { identity } from "./identity";

export const map = function* <T, U>(
  iterator: Iterator<T>,
  mapFunction: (value: T) => U
): Generator<U, void, undefined> {
  for (const value of identity(iterator)) {
    yield mapFunction(value);
  }
};
