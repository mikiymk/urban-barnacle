export function* identity<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
