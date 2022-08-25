export const identity = function* <T>(
  iterator: Iterator<T>
): Generator<T, void, undefined> {
  let cur = iterator.next();

  while (!cur.done) {
    yield cur.value;
    cur = iterator.next();
  }
};
