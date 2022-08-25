import { identity } from "../transformer/identity";

export const find = function <T>(
  iterator: Iterator<T>,
  findFunction: (value: T) => boolean
): T | undefined {
  for (const value of identity(iterator)) {
    if (findFunction(value)) {
      return value;
    }
  }

  return undefined;
};
