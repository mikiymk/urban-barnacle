type Tuple<I, L extends number, T extends I[] = []> = L extends 0
  ? []
  : T["length"] extends L
  ? T
  : Tuple<I, L, [...T, I]>;

export const tee = function <T, TReturn, TNext, N extends number>(
  iterator: Iterator<T, TReturn, TNext>,
  length: N
): Tuple<Generator<T, TReturn, TNext>, N> {
  const read: IteratorResult<T, TReturn>[] = [];

  const teed = function* (): Generator<T, TReturn, TNext> {
    let cur = undefined;
    let index = 1;

    if (read.length > 0) {
      [cur] = read;
    } else {
      cur = iterator.next();
      read.push(cur);
    }

    while (!cur.done) {
      try {
        const next = yield cur.value;

        if (read.length > index) {
          cur = read[index];
        } else {
          cur = iterator.next(next);
          read.push(cur);
        }
        index += 1;
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    return cur.value;
  };

  return Array.from({ length }, () => teed()) as Tuple<
    Generator<T, TReturn, TNext>,
    N
  >;
};
