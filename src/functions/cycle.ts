export function* cycle<T, TNext>(iterable: Iterator<T, void, TNext>): Generator<T, never, TNext> {
  let cur = iterator.next();
  const valueCollector = [cur.value];

  while (!cur.done) {
    const next = yield cur.value;
    cur = iterator.next(next);
    valueCollector.push(cur.value);
  }

  while (true) {
    for (const value of valueCollector) {
      yield value;
    }
  }
}
