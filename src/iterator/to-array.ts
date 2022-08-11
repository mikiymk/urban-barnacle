export const toArray = function <T>(iterator: Iterator<T>): T[] {
  const valueCollector = [];
  let cur = iterator.next();

  while (!cur.done) {
    valueCollector.push(cur.value);
    cur = iterator.next();
  }

  return valueCollector;
};
