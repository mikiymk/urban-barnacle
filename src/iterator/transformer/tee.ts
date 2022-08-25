type Tuple<I, L extends number, T extends I[] = []> = L extends 0
  ? []
  : T["length"] extends L
  ? T
  : Tuple<I, L, [...T, I]>;

export const tee = function <T, N extends number>(
  iterator: Iterator<T>,
  length: N
): Tuple<Generator<T, void, undefined>, N> {
  const read: IteratorResult<T, unknown>[] = [];

  const teed = function* (): Generator<T, void, undefined> {
    let cur = undefined;
    let index = 1;

    if (read.length > 0) {
      [cur] = read;
    } else {
      cur = iterator.next();
      read.push(cur);
    }

    while (!cur.done) {
      yield cur.value;

      if (read.length > index) {
        cur = read[index];
      } else {
        cur = iterator.next();
        read.push(cur);
      }
      index += 1;
    }
  };

  return Array.from({ length }, () => teed()) as Tuple<
    Generator<T, void, undefined>,
    N
  >;
};
