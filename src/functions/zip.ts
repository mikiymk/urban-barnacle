export function* zip<T, TReturn, TNext>(...iterators: Iterator<T, TReturn, TNext>[]): Generator<T[], TReturn[], TNext> {
  let curs = iterators.map((iterator) => iterator.next());

  while (curs.every((cur) => !cur.done)) {
    try {
      const next = yield curs.map((cur) => cur.value);
      curs = iterators.map((iterator) => iterator.next(next));
    } catch (error) {
      iterators.map((iterator) => iterator.throw?.(error));
    }
  }

  return curs.map((cur) => cur.value);
}
