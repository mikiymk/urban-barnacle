export function* cycle<T, TNext>(iterator: Iterator<T, void, TNext>): Generator<T, never, TNext> {
  let cur = iterator.next();
  const values = [cur.value];

  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
      values.push(cur.value);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  while (true) {
    for (const value of values) {
      try {
        yield value;
      } catch (error) {
        iterator.throw?.(error);
      }
    }
  }
}
