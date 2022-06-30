/**
 */
export function range(start?: number, end?: number): Generator<number>;
export function* range(start = 0, end = Infinity): Generator<number> {
  const increment = start < end ? 1 : -1;

  for (let i = start; i < end; i += increment) {
    yield i;
  }
}
