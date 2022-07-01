function isIterable<T, TReturn, TNext>(obj: T | Iterator<T, TReturn, TNext>): obj is Iterator<T, TReturn, TNext> {
  return typeof obj === "object" && obj != null && "next" in obj;
}

export function* flat<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, depth: number): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      let next: TNext;
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
}
