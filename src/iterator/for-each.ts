export function forEach<T, TReturn, TNext>(iterator: Iterator<T, void, TNext>, forEachFunction: (value: T) => void, nextProvidor: () => TNext): TReturn {
  let cur = iterator.next();

  while (!cur.done) {
    forEachFunction(cur.value);
    cur = iterator.next(nextProvidor());
  }

  return cur.value
}
