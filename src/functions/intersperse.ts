export function* intersperse<T, TNext, TReturn>(iterator: Iterator<T, TNext, TReturn>, separator: T): Generator<T, TNext, TReturn> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      yield cur.value;
      const next = yield separator;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}
