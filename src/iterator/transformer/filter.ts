import { identity } from "./identity";

export const filter = function* <T>(
  iterator: Iterator<T>,
  filterFunction: (value: T) => boolean
): Generator<T, void, undefined> {
  for (const value of identity(iterator)) {
    if (filterFunction(value)) {
      yield value;
    }
  }
};
