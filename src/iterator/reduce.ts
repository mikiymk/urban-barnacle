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
  const previous = iterator.next();
  if (previous.done) {
    return initialValue;
  }
  let previousValue: T | U;
  let current: IteratorResult<T>;

  if (initialValue === undefined) {
    previousValue = previous.value;
    current = iterator.next();
  } else {
    previousValue = initialValue;
    current = previous;
  }

  while (!current.done) {
    previousValue = reduceFunction(previousValue, current.value);
    current = iterator.next();
  }

  return previousValue;
};
