export const toArray = function <T, TNext>(
  iterator: Iterator<T, void, TNext>,
  nextProvidor: () => TNext
): T[] {
  const valueCollector = [];
  let cur = iterator.next();

  while (!cur.done) {
    valueCollector.push(cur.value);
    cur = iterator.next(nextProvidor());
  }

  return valueCollector;
};
