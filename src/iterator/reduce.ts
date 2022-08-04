export const reduce = function <T, TNext, U>(
  iterator: Iterator<T, void, TNext>,
  reduceFunction: (previousValue: T | U, currentValue: T) => T | U,
  initialValue?: U
): T | U | undefined {
  let curr = iterator.next();
  if (curr.done) {
    return initialValue;
  }
  let prev: T | U = initialValue ?? curr.value;
  curr = iterator.next();

  while (!curr.done) {
    prev = reduceFunction(prev, curr.value);
    curr = iterator.next();
  }

  return prev;
};
