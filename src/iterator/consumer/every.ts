import { toIterable } from "./to-iterable";

export const every = <T>(
  iterator: Iterator<T>,
  everyFunction: (value: T) => boolean
): boolean => {
  for (const value of toIterable(iterator)) {
    if (!everyFunction(value)) {
      return false;
    }
  }

  return true;
};
