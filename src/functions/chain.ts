export function* chain<T, TRetuen, TNext>(...iterators: Iterator<T, TRetuen, TNext>[]): Generator<T, TRetuen, TNext> {
  for (let iterator of iterables) {
    let cur = iterator.next();

    while (!cur.done) {
      try {
        const next = yield cur.value;
        cur = iterator.next(next);
      } catch (error) {
        iterator.throw?.(error);
      }
    }
  }

  return cur.value;
}
