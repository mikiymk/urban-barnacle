export function toArray<T>(iterator: Iterator<T, void, TNext>, nextProvidor: () => TNext): T[] {
  let valueCollector = [];
  let cur = iterator.next();

  while (!cur.done) {
    valueCollector.push(cur.value);
    cur = iterator.next(nextProvidor());
  }

  return valueCollector
}
