import { test, expect } from "vitest";

import { fromArray } from "./from";
import { toArray } from "./to-array";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("iterator to array", () => {
  expect.assertions(1 + 5);

  const result = toArray(iterator());

  expect(result).toEqual([1, 2, 3, 4, 5]);
});

test("from array, to array", () => {
  expect.assertions(1);

  const result = toArray(fromArray([1, 2, 3, 4, 5]));

  expect(result).toEqual([1, 2, 3, 4, 5]);
});
