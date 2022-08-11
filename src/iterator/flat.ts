const isIterable = <T, TReturn, TNext>(
  obj: Iterator<T, TReturn, TNext> | T
): obj is Iterator<T, TReturn, TNext> =>
  typeof obj === "object" &&
  obj !== null &&
  "next" in obj &&
  typeof obj.next === "function";

type Decr<N extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...number[]
][N];

type FlattenGenerator<T, TReturn, TNext, Depth extends number> = {
  done: Generator<T, TReturn, TNext>;
  recur: T extends Iterator<infer TItem, unknown, infer TItemNext>
    ? FlattenGenerator<TItem, TNext, TItemNext, Decr<Depth>>
    : Generator<T, TReturn, TNext>;
}[Depth extends 0 ? "done" : "recur"];

type FlatType = {
  <T, TReturn, TNext, Depth extends number>(
    iterator: Iterator<T, TReturn, TNext>,
    depth: Depth
  ): FlattenGenerator<T, TReturn, TNext, Depth>;

  <T, TReturn, TNext, Depth extends number>(
    iterator: Iterator<Iterator<T, TReturn, TNext>, TReturn, TNext>,
    depth: Depth
  ): FlattenGenerator<Iterator<T, TReturn, TNext>, TReturn, TNext, Depth>;
};

export const flat: FlatType = function* <
  T,
  TReturn,
  TNext,
  Depth extends number
>(
  iterator: Iterator<T, TReturn, TNext>,
  depth: Depth
): Generator<unknown, TReturn, TNext | undefined> {
  let cur = iterator.next();

  while (!cur.done) {
    try {
      let next = undefined;
      if (isIterable<T, TNext, TNext>(cur.value) && depth > 0) {
        next = yield* flat(cur.value, depth - 1);
      } else {
        next = yield cur.value;
      }
      if (next === undefined) {
        cur = iterator.next();
      } else {
        cur = iterator.next(next);
      }
    } catch (error) {
      iterator.throw?.(error);
    }
  }

  return cur.value;
};
