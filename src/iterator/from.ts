export function fromArray<T>(array: Array<T> | ArrayLike<T>): Iterator<T, any, unknown> {
  return Array.prototype[Symbol.iterator].call(array);
}

export function fromIterable<T>(iterable: Iterable<T>): Iterator<T, any, unknown> {
  return iterable[Symbol.iterator]();
}

export function from<T>(iterable: Array<T> | ArrayLike<T> | Iterable<T>): Iterator<T, any, unknown> {
  return "length" in iterable ? fromArray(iterable) : fromIterable(iterable);
}
