export function* range(start = 0, end = Number.Infinity) {
  const increment = start < end ? 1 : -1;

  for (let i = start; i < end; i += increment) {
    yield i;
  }
}

export function* repeat<T>(value: T) {
  while (true) {
    yield value;
  }
}

export function* identity(array: Iterator<T>) {
  let cur = iterator.next();
  while (!cur.done) {
    try {
      const next = yield cur.value;
      cur = iterator.next(next);
    } catch (error) {
      iterator.throw(error);
    }
  }
}

export function from<T>(array: T[] | ArrayLike<T> | Iterator<T> | Iterable<T>): Iterator<T> {
  if (Symbol.iterator in array) {
    // Array Iterable
    return array[Symbol.iterator]();
  }
  if ("length" in array) {
    const isArrayLike = false;
    try {
      Number(array.length);
      isArrayLike = true;
    } catch {}

    if (isArrayLike) {
      // ArrayLike
      return (function* (){
        for (let i = 0; i < array.length; i++) {
          yield array[i];
        }
      })();
    }
  }

  // Iterator
  return array;
}

export function* cycle<T>(iterator: Iterator) {
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

export function* chain<T>(iterator: Iterator<T>) {}
export function* zip<T>(iterator: Iterator<T>) {}
export function* zipLong<T>(iterator: Iterator<T>) {}
export function* map<T>(iterator: Iterator<T>) {}
export function* filter<T>(iterator: Iterator<T>) {}
export function* flat<T>(iterator: Iterator<T>) {}
export function* take<T>(iterator: Iterator<T>) {}
export function* skip<T>(iterator: Iterator<T>) {}
export function* stepBy<T>(iterator: Iterator<T>) {}
export function* groupBy<T>(iterator: Iterator<T>) {}
export function* withIndex<T>(iterator: Iterator<T>) {}
export function* tee<T>(iterator: Iterator<T>) {}
export function reduce<T>(iterator: Iterator<T>) {}
export function toArray<T>(iterator: Iterator<T>) {}
intersperse
chunk
window
all
any
