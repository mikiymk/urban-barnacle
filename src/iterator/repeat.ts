/**
 */
export function repeat<T>(value: T): Generator<T>;
export function* repeat<T>(value: T): Generator<T> {
  while (true) {
    yield value;
  }
}
