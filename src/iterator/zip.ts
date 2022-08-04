export const zip = function* <T, TReturn, TNext>(
  ...iterators: Iterator<T, TReturn, TNext>[]
): Generator<T[], (T | TReturn)[], TNext> {
  let curs = iterators.map((iterator) => iterator.next());

  while (curs.every((cur): cur is IteratorYieldResult<T> => !cur.done)) {
    try {
      const next = yield curs.map((cur) => cur.value);
      curs = iterators.map((iterator) => iterator.next(next));
    } catch (error) {
      iterators.forEach((iterator) => iterator.throw?.(error));
    }
  }

  return curs.map((cur) => cur.value);
};

export const zipLong = function* <T, TReturn, TNext>(
  ...iterators: Iterator<T, TReturn, TNext>[]
): Generator<(T | TReturn)[], TReturn[], TNext> {
  let curs = iterators.map((iterator) => iterator.next());

  while (
    !curs.every((cur): cur is IteratorReturnResult<TReturn> =>
      Boolean(cur.done)
    )
  ) {
    try {
      const next = yield curs.map((cur) => cur.value);
      curs = iterators.map((iterator) => iterator.next(next));
    } catch (error) {
      iterators.forEach((iterator) => iterator.throw?.(error));
    }
  }

  return curs.map((cur) => cur.value);
};
