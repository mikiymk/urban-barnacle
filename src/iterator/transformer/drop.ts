import { toIterable } from "../consumer/to-iterable";

export const dropCount = function* <T>(
  iterator: Iterator<T>,
  length: number
): Generator<T, void, undefined> {
  let cur = iterator.next();

  for (let index = 0; !cur.done && index < length; index += 1) {
    cur = iterator.next();
  }

  if (!cur.done) yield cur.value;

  for (const value of toIterable(iterator)) {
    yield value;
  }
};

export const dropWhile = function* <T>(
  iterator: Iterator<T>,
  dropWhileFunction: (value: T) => boolean
): Generator<T, void, undefined> {
  let cur = iterator.next();

  while (!cur.done && dropWhileFunction(cur.value)) {
    cur = iterator.next();
  }

  if (!cur.done) yield cur.value;

  for (const value of toIterable(iterator)) {
    yield value;
  }
};

export const drop = <T>(
  iterator: Iterator<T>,
  condition: number | ((value: T) => boolean)
): Generator<T, void, undefined> => {
  if (typeof condition === "number") {
    // Count condition
    return dropCount(iterator, condition);
  }
  // Function condition (like filter)
  return dropWhile(iterator, condition);
};
