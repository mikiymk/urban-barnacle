export const toIterable = <T>(iterator: Iterator<T>): Iterable<T> => ({
  [Symbol.iterator]: () => iterator,
});
