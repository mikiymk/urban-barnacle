import { identity } from "../transformer/identity";

export const some = <T>(
  iterator: Iterator<T>,
  someFunction: (value: T) => boolean
): boolean => {
  for (const value of identity(iterator)) {
    if (someFunction(value)) {
      return true;
    }
  }

  return false;
};
