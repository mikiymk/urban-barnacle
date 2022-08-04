type Zero = 0;
type TupleOrLess<I, L extends number, T extends I[] = []> = L extends Zero
  ? []
  : T["length"] extends L
  ? T
  : T | TupleOrLess<I, L, [...T, I]>;

export const chunks = function* <T, TReturn, TNext, N extends number>(
  iterator: Iterator<T, TReturn, TNext>,
  size: N
): Generator<TupleOrLess<T, N>, TReturn, TNext> {
  let cur = iterator.next();
  let next: TNext | undefined = undefined;

  while (!cur.done) {
    const valueCollector = [];
    const incr = 1;

    for (let index = 0; index < size && !cur.done; index += incr) {
      valueCollector.push(cur.value);
      if (next === undefined) cur = iterator.next();
      else cur = iterator.next(next);
    }
    try {
      next = yield valueCollector as TupleOrLess<T, N>;
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
