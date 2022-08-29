import { toIterable } from "./to-iterable";

export const forEach = <T>(
  iterator: Iterator<T>,
  forEachFunction: (value: T) => void
): void => {
  for (const value of toIterable(iterator)) {
    forEachFunction(value);
  }
};
