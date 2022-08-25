import { identity } from "../transformer/identity";

type ReduceType = {
  <T>(
    iterator: Iterator<T>,
    reduceFunction: (previousValue: T, currentValue: T) => T
  ): T | undefined;
  <T, U>(
    iterator: Iterator<T>,
    reduceFunction: (previousValue: U, currentValue: T) => U,
    initialValue: U
  ): U;
};

export const reduce: ReduceType = function <T, U>(
  iterator: Iterator<T>,
  reduceFunction: (previousValue: T | U, currentValue: T) => T | U,
  initialValue?: U
): T | U | undefined {
  let previousValue: T | U;
  if (initialValue === undefined) {
    const previous = iterator.next();
    if (previous.done) {
      return initialValue;
    }
    previousValue = previous.value;
  } else {
    previousValue = initialValue;
  }

  for (const value of identity(iterator)) {
    previousValue = reduceFunction(previousValue, value);
  }

  return previousValue;
};
