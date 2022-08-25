import { identity } from "./identity";

export const withIndex = function* <T>(
  iterator: Iterator<T>,
  start = 0
): Generator<[number, T], void, undefined> {
  let index = start;

  for (const value of identity(iterator)) {
    yield [index, value];
    index += 1;
  }
};
