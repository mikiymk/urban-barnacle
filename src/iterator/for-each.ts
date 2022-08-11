export const forEach = <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  forEachFunction: (value: T) => void
): TReturn => {
  let cur = iterator.next();

  while (!cur.done) {
    forEachFunction(cur.value);
    cur = iterator.next();
  }

  return cur.value;
};
