const isIterable = <T, TReturn, TNext>(
  obj: Iterator<T, TReturn, TNext> | T
): obj is Iterator<T, TReturn, TNext> =>
  typeof obj === "object" && obj !== null && "next" in obj;

export const flat = function* <T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>,
  depth: number
): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      let next = undefined;
      if (isIterable<T, TNext, TNext>(cur.value) && depth > 0) {
        next = yield* flat(cur.value, depth - 1);
      } else {
        next = yield cur.value;
      }
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
