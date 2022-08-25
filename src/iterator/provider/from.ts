export const fromArray = <T>(array: ArrayLike<T> | T[]): Iterator<T> =>
  Array.prototype[Symbol.iterator].call(array);

export const fromIterable = <T>(iterable: Iterable<T>): Iterator<T> =>
  iterable[Symbol.iterator]();

export const from = <T>(
  iterable: ArrayLike<T> | Iterable<T> | T[]
): Iterator<T> => {
  if ("length" in iterable) return fromArray(iterable);
  return fromIterable(iterable);
};
