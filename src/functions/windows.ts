export function* windows<T, TReturn, TNext, N extends number>(iterator: Iterator<T, TReturn, TNext>, size: N): Generator<Tuple<T, N>, TReturn, TNext> {
  let cur = iterator.next();

  const valueCollector = [];

  for (let i = 0; i < windowSize && !cur.done; i++) {
    valueCollector.push(cur.value);
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield valueCollector;
      valueCollector.shift();
      cur = iterator.next(next);
      valueCollector.push(cur.value);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
