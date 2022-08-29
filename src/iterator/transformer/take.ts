import { toIterable } from "../consumer/to-iterable";

export const takeCount = function* <T>(
  iterator: Iterator<T>,
  length: number
): Generator<T, void, undefined> {
  let index = 0;
  for (const value of toIterable(iterator)) {
    if (index >= length) {
      break;
    }
    index += 1;
    yield value;
  }
};

export const takeWhile = function* <T>(
  iterator: Iterator<T>,
  takeWhileFunction: (value: T) => boolean
): Generator<T, void, undefined> {
  for (const value of toIterable(iterator)) {
    if (!takeWhileFunction(value)) {
      break;
    }
    yield value;
  }
};

export const take = <T>(
  iterator: Iterator<T>,
  condition: number | ((value: T) => boolean)
): Generator<T, void, undefined> => {
  if (typeof condition === "number") {
    // Count condition
    return takeCount(iterator, condition);
  }
  // Function condition (like filter)
  return takeWhile(iterator, condition);
};
