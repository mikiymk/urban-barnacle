export function* fromArray<T>(array: Array<T> | ArrayLike<T>): Iterator<T, any, unknown> {
  for (let i = 0; i < array.length; i++) {
    // lazy call
    yield array[i];
  }
}

export function fromIterable<T>(iterable: Iterable<T>): Iterator<T, any, unknown> {
  return iterable[Symbol.iterator]();
}

export function from<T>(iterable: Array<T> | ArrayLike<T> | Iterable<T>): Iterator<T, any, unknown> {
  return "length" in iterable && !Array.isArray(iterable)
    ? fromArray(iterable)
    : fromIterable(iterable);
}
