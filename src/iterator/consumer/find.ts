import { toIterable } from "./to-iterable";

export const find = function <T>(
  iterator: Iterator<T>,
  findFunction: (value: T) => boolean
): T | undefined {
  for (const value of toIterable(iterator)) {
    if (findFunction(value)) {
      return value;
    }
  }

  return undefined;
};
