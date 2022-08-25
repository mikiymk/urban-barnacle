type Zero = 0;
type TupleOrLess<I, L extends number, T extends I[] = [I]> = L extends Zero
  ? []
  : T["length"] extends L
  ? T
  : T | TupleOrLess<I, L, [...T, I]>;

export const chunks = function* <T, N extends number>(
  iterator: Iterator<T>,
  size: N
): Generator<TupleOrLess<T, N>, void, undefined> {
  let cur = iterator.next();

  while (!cur.done) {
    const valueCollector = [];

    for (let index = 0; index < size && !cur.done; index += 1) {
      valueCollector.push(cur.value);
      cur = iterator.next();
    }

    yield valueCollector as TupleOrLess<T, N>;
  }
};
