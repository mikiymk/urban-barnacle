type Tuple<I, L extends number, T extends I[] = []> = L extends 0
  ? []
  : T["length"] extends L
  ? T
  : Tuple<I, L, [...T, I]>;

export const windows = function* <T, TReturn, TNext, N extends number>(
  iterator: Iterator<T, TReturn, TNext>,
  windowSize: N
): Generator<Tuple<T, N>, TReturn, TNext> {
  let cur = iterator.next();

  const valueCollector = [];

  for (let index = 0; index < windowSize && !cur.done; index += 1) {
    valueCollector.push(cur.value);
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield valueCollector as Tuple<T, N>;
      valueCollector.shift();
      cur = iterator.next(next);
      valueCollector.push(cur.value);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
