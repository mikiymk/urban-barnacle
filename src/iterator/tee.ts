type Tuple<I, L extends number, T extends I[] = []>
  = L extends 0 ? []
    : T["length"] extends L ? T
    : Tuple<I, L, [...T, I]>

export function tee<T, TReturn, TNext, N extends number>(iterator: Iterator<T, TReturn, TNext>, length: N): Tuple<Generator<T, TReturn, TNext>, N> {
  let read: IteratorResult<T, TReturn>[] = [];

  function* teed(): Generator<T, TReturn, TNext> {
    let cur: IteratorResult<T, TReturn>;

    if (read.length > 0) {
      cur = read[0];
    } else {
      cur = iterator.next();
      read.push(cur);
    }

    while (!cur.done) {
      try {
        const next = yield cur.value;

        if (read.length > i) {
          cur = read[i];
        } else {
          cur = iterator.next(next);
          read.push(cur);
        }
        i++;
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    return cur.value;
  }

  return Array.from({ length }, () => teed());
}
