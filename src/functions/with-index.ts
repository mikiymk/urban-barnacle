export function* withIndex<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, start = 0): Generator<[number, T], TReturn, TNext> {
  let i = start;
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield [i++, cur.value];
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
