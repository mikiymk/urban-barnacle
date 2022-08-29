import { toIterable } from "./to-iterable";

export const some = <T>(
  iterator: Iterator<T>,
  someFunction: (value: T) => boolean
): boolean => {
  for (const value of toIterable(iterator)) {
    if (someFunction(value)) {
      return true;
    }
  }

  return false;
};
