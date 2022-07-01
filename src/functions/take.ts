export function* takeCount<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, length: number): Generator<T, T | TReturn, TNext> {
  let i = 0;
  let cur = iterator.next();

  while (!cur.done && i++ < length) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function* takeWhile<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, takeWhileFunction: (value: T) => boolean): Generator<T, T | TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      if (!takeWhileFunction(cur.value)) {
        break;
      }
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function take<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, condition: number | ((value: T) => boolean)): Generator<T, T | TReturn, TNext> {
  if (typeof condition === "number") {
    // count condition
    return takeCount(iterator, condition);
  } else {
    // function condition (like filter)
    return takeWhile(iterator, condition);
  }
}
