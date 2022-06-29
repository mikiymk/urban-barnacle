export type IterableLike<T, TReturn = any, TNext = undefined> =
  | Array<T>
  | ArrayLike<T>
  | Iterator<T, TReturn, TNext>
  | Iterable<T>;

export function* countUp(start = 0): Generator<number> {
  while (true) {
    yield start++;
  }
}

export function* range(start = 0, end = Infinity): Generator<number> {
  const increment = start < end ? 1 : -1;

  for (let i = start; i < end; i += increment) {
    yield i;
  }
}

export function* repeat<T>(value: T): Generator<T> {
  while (true) {
    yield value;
  }
}

export function* identity<T, TReturn, TNext>(
  iterator: Iterator<T, TReturn, TNext>
): Generator<T, TReturn, TNext> {
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

export function from<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>
): Iterator<T, TReturn, TNext> | Iterator<T, any, unknown> {
  if ("next" in iterable) {
    // Iterator
    return iterable;
  } else if ("length" in iterable) {
    // Array ArrayLike
    return (function* () {
      for (let i = 0; i < iterable.length; i++) {
        // lazy
        yield iterable[i];
      }
    })();
  } else {
    // Iterable
    return iterable[Symbol.iterator]();
  }
}

export function* cycle<T>(iterable: IterableLike<T>) {
  const iterator = from(iterable);

  let cur = iterator.next();
  const valueCollector = [cur.value];
  while (!cur.done) {
    const next = yield cur.value;
    cur = iterator.next(next);
    valueCollector.push(cur.value);
  }

  while (true) {
    for (const value of valueCollector) {
      yield value;
    }
  }
}

export function* chain<T>(...iterables: IterableLike<T>[]) {
  for (let iterable of iterables) {
    const iterator = from(iterable);

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
}

export function* zip<T, TReturn = any, TNext = unknown>(
  ...iterables: IterableLike<T, TReturn, TNext>[]
): Generator<T[], TReturn[], TNext> {
  const iterators = iterables.map((iterable) => from(iterable));

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

export function* zipLong<T, TReturn = any, TNext = unknown>(
  ...iterables: IterableLike<T, TReturn, TNext>[]
): Generator<T[], TReturn[], TNext> {
  const iterators = iterables.map((iterable) => from(iterable));

  let curs = iterators.map((iterator) => iterator.next());
  while (curs.some((cur) => !cur.done)) {
    try {
      const next = yield curs.map((cur) => cur.value);
      curs = iterators.map((iterator) => iterator.next(next));
    } catch (error) {
      iterators.map((iterator) => iterator.throw?.(error));
    }
  }

  return curs.map((cur) => cur.value);
}
export function map<T, U, TReturn = any, TNext = unknown>(
  iterable: IterableLike<T, TReturn, TNext>,
  mapFunction: (value: T) => U
): Generator<U, TReturn, TNext>;
export function map<T, U, TReturn = any, UReturn = any, TNext = unknown>(
  iterable: IterableLike<T, TReturn, TNext>,
  mapFunction: (value: T) => U,
  mapReturnFunction?: (value: TReturn) => UReturn
): Generator<U, UReturn, TNext>;
export function* map<T, U, TReturn = any, UReturn = any, TNext = unknown>(
  iterable: IterableLike<T, TReturn, TNext>,
  mapFunction: (value: T) => U,
  mapReturnFunction?: (value: TReturn) => UReturn
): Generator<U, TReturn | UReturn, TNext> {
  const iterator = from(iterable);

  let cur = iterator.next();
  while (!cur.done) {
    try {
      const next = yield mapFunction(cur.value);
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return mapReturnFunction ? mapReturnFunction(cur.value) : cur.value;
}

export function* filter<T, TReturn = any, TNext = unknown>(
  iterable: IterableLike<T, TReturn, TNext>,
  filterFunction: (value: T) => boolean
): Generator<T, TReturn, TNext> {
  const iterator = from(iterable);

  let cur = iterator.next();
  while (!cur.done) {
    try {
      if (filterFunction(cur.value)) {
        const next = yield cur.value;
        cur = iterator.next(next);
      } else {
        cur = iterator.next();
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

function isIterable<T, TReturn, TNext>(
  obj: T | IterableLike<T, TReturn, TNext>
): obj is IterableLike<T, TReturn, TNext> {
  return (
    typeof obj === "object" &&
    obj != null &&
    ("next" in obj || "length" in obj || Symbol.iterator in obj)
  );
}
[].flat;
export function* flat<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>,
  depth: number
): Generator<T, TReturn, TNext> {
  const iterator = from(iterable);

  let cur = iterator.next();
  while (!cur.done) {
    try {
      let next: TNext;
      if (isIterable<T, TNext, TNext>(cur.value) && depth > 0) {
        next = yield* flat(from(cur.value), depth - 1);
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

export function* take<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>,
  condition: number | ((value: T) => boolean)
): Generator<T, T | TReturn, TNext> {
  const iterator = from(iterable);

  if (typeof condition === "number") {
    // count condition
    let i = 0;
    let cur = iterator.next();
    while (!cur.done && i++ < condition) {
      try {
        const next = yield cur.value;
        cur = iterator.next(next);
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    return cur.value;
  } else {
    // function condition (like filter)
    let cur = iterator.next();
    while (!cur.done) {
      try {
        if (!condition(cur.value)) {
          return cur.value;
        }
        const next = yield cur.value;
        cur = iterator.next(next);
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    return cur.value;
  }
}

export function* skip<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>,
  condition: number | ((value: T) => boolean)
): Generator<T, TReturn, TNext> {
  const iterator = from(iterable);

  if (typeof condition === "number") {
    // count condition
    let cur = iterator.next();

    let i = 0;
    while (!cur.done && i++ < condition) {
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
  } else {
    // function condition (like filter)
    let cur = iterator.next();

    while (!cur.done && condition(cur.value)) {
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
}

export function* stepBy<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>,
  step: number
): Generator<T, TReturn, TNext> {
  if (step <= 0) {
    throw new RangeError("2nd argument `step` is set upper 1");
  }
  const iterator = from(iterable);

  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield cur.value;

      // `step` times
      for (let i = 0; i < step; i++) {
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function* groupBy<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>,
  key: (previous: T, current: T) => boolean
): Generator<T[], TReturn, TNext> {
  const iterator = from(iterable);

  let prev = iterator.next();
  let cur = iterator.next();

  if (prev.done) {
    // iterator has no value
    return prev.value;
  } else if (!prev.done && cur.done) {
    // iterator has only 1 value
    yield [prev.value];
    return cur.value;
  }

  let valueCollector = [prev.value];
  while (!cur.done) {
    try {
      if (key(prev.value, cur.value)) {
        valueCollector.push(cur.value);
        prev = cur;
        cur = iterator.next();
      } else {
        const next = yield valueCollector;
        valueCollector = [cur.value];
        prev = cur;
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function* withIndex<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>
): Generator<[number, T], TReturn, TNext> {
  const iterator = from(iterable);

  let i = 0;
  let cur = iterator.next();

  while (!cur.done) {
    try {
      const next = yield [i++, cur.value];
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function tee<T, TReturn, TNext>(
  iterable: IterableLike<T, TReturn, TNext>
): [Generator<T, TReturn, TNext>, Generator<T, TReturn, TNext>] {
  let readed: IteratorResult<T, TReturn>[] = [];

  function* teed() {
    const iterator = from(iterable);

    let i = 1;
    let cur: IteratorResult<T, TReturn>;

    if (readed.length > 0) {
      cur = readed[0];
    } else {
      cur = iterator.next();
      readed.push(cur);
    }

    while (!cur.done) {
      try {
        const next = yield cur.value;

        if (readed.length > i) {
          cur = readed[i];
        } else {
          cur = iterator.next(next);
          readed.push(cur);
        }
        i++;
      } catch (error) {
        iterator.throw?.(error);
      }
    }

    return cur.value;
  }

  return [teed(), teed()];
}

export function reduce<T>(iterator: Iterator<T>) {
  let prev = initialValue ?? iterator.next().value;
  let curr = iterator.next();

  while (!curr.done) {
    prev = reduceFunction(prev, curr.value);
    curr = iterator.next();
  }

  return prev
}

export function* intersperse<T>(iterator: IterableLike<T>) {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      yield separator;
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function* chunks<T>(iterator: IterableLike<T>) {
  let cur = iterator.next();
  let next;

  while (!cur.done) {
    const valueCollector = [];

    for (let i = 0; i < chunkSize && !cur.done; i++) {
      valueCollector.push(cur.value);
      cur = iterator.next(next);
    }
    try {
      next = yield valueCollector;
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function* windows<T>(iterator: IterableLike<T>) {
  let cur = iterator.next();

  const valueCollector = [];

  for (let i = 0; i < windowSize && !cur.done; i++) {
    valueCollector.push(cur.value);
    cur = iterator.next();
  }

  while (!cur.done) {
    try {
      const next = yield valueCollector;
      valueCollector.shift();
      cur = iterator.next(next);
      valueCollector.push(cur.value);
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
}

export function every<T>(iterator: IterableLike<T>) {
  let curr = iterator.next();

  while (!curr.done) {
    if (!everyFunction(curr.value)) {
      return false;
    }
    curr = iterator.next();
  }

  return true;
}

export function some<T>(iterator: IterableLike<T>) {
  let curr = iterator.next();

  while (!curr.done) {
    if (someFunction(curr.value)) {
      return true;
    }
    curr = iterator.next();
  }

  return false;
}
