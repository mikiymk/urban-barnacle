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

  let valueCollector = [];

  for (let index = 0; index < windowSize - 1 && !cur.done; index += 1) {
    valueCollector.push(cur.value);
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      valueCollector.push(cur.value);
      const next = yield valueCollector as Tuple<T, N>;
      valueCollector = valueCollector.slice(1);
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
