import { identity } from "../transformer/identity";

export const every = <T>(
  iterator: Iterator<T>,
  everyFunction: (value: T) => boolean
): boolean => {
  for (const value of identity(iterator)) {
    if (!everyFunction(value)) {
      return false;
    }
  }

  return true;
};
