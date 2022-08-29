import { toIterable } from "../consumer/to-iterable";

const isIterable = <T>(obj: Iterator<T> | T): obj is Iterator<T> =>
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

type FlattenGenerator<T, Depth extends number> = {
  done: Generator<T, void, undefined>;
  recur: T extends Iterator<infer TItem>
    ? FlattenGenerator<TItem, Decr<Depth>>
    : Generator<T, void, undefined>;
}[Depth extends 0 ? "done" : "recur"];

type FlatType = {
  <T, Depth extends number>(
    iterator: Iterator<T>,
    depth: Depth
  ): FlattenGenerator<T, Depth>;

  <T, Depth extends number>(
    iterator: Iterator<Iterator<T>>,
    depth: Depth
  ): FlattenGenerator<Iterator<T>, Depth>;
};

export const flat: FlatType = function* <T, Depth extends number>(
  iterator: Iterator<T>,
  depth: Depth
): Generator<unknown, void, undefined> {
  for (const value of toIterable(iterator)) {
    if (isIterable<T>(value) && depth > 0) {
      yield* flat(value, depth - 1);
    } else {
      yield value;
    }
  }
};
