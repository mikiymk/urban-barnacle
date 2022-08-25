export const repeat = function* <T>(value: T): Generator<T> {
  while (true) {
    yield value;
  }
};
