import { identity } from "../transformer/identity";

export const forEach = <T>(
  iterator: Iterator<T>,
  forEachFunction: (value: T) => void
): void => {
  for (const value of identity(iterator)) {
    forEachFunction(value);
  }
};
