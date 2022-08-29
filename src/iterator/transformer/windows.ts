import { toIterable } from "../consumer/to-iterable";

type Tuple<I, L extends number, T extends I[] = []> = L extends 0
  ? []
  : T["length"] extends L
  ? T
  : Tuple<I, L, [...T, I]>;

export const windows = function* <T, N extends number>(
  iterator: Iterator<T>,
  windowSize: N
): Generator<Tuple<T, N>, void, undefined> {
  let valueCollector = [];

  for (let index = 0; index < windowSize; index += 1) {
    const cur = iterator.next();
    if (cur.done) return;
    valueCollector.push(cur.value);
  }

  for (const value of toIterable(iterator)) {
    yield valueCollector as Tuple<T, N>;
    [, ...valueCollector] = [...valueCollector, value];
  }
  yield valueCollector as Tuple<T, N>;
};
