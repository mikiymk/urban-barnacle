type TupleOrLess<I, L extends number, T extends I[] = []>
  = L extends 0 ? []
    : T["length"] extends L ? T
    : T | Tuple<I, L, [...T, I]>;

export function* chunks<T, TReturn, TNext, N extends number>(iterator: Iterator<T, TReturn, TNext>, size: N): Generator<TupleOrLess<T, N>, TReturn, TNext> {
  let cur = iterator.next();
  let next: TNext;

  while (!cur.done) {
    const valueCollector = [];

    for (let i = 0; i < size && !cur.done; i++) {
      valueCollector.push(cur.value);
      cur = iterator.next(next);
    }
    try {
      next = yield valueCollector;
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
