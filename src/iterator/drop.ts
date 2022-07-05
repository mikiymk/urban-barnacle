export function* dropCount<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, length: number): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  let i = 0;
  while (!cur.done && i++ < length) {
    cur = iterator.next();
  }

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

export function* dropWhile<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, dropWhileFunction: (value: T) => boolean): Generator<T, TReturn, TNext> {
  let cur = iterator.next();

  while (!cur.done && dropWhileFunction(cur.value)) {
    cur = iterator.next();
  }

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

export function* drop<T, TReturn, TNext>(iterator: Iterator<T, TReturn, TNext>, condition: number | ((value: T) => boolean)): Generator<T, TReturn, TNext> {
  if (typeof condition === "number") {
    // count condition
    return dropCount(iterator, condition);
  } else {
    // function condition (like filter)
    return dropWhile(iterator, condition);
  }
}
