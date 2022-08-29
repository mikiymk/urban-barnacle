import { test, expect } from "vitest";

import { toIterable } from "./to-iterable";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("iterator to iterable", () => {
  const result = toIterable(iterator());

  let count = 1;

  for (const value of result) {
    expect(count).toBe(value);
    count += 1;
  }
});

test("from array, to array", () => {
  const it = iterator();
  const result = toIterable(it);

  expect(result[Symbol.iterator]()).toBe(it);
});
