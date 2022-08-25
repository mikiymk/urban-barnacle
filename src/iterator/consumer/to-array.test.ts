import { test, expect } from "vitest";

import { fromArray } from "../provider/from";

import { toArray } from "./to-array";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("iterator to array", () => {
  const result = toArray(iterator());

  expect(result).toEqual([1, 2, 3, 4, 5]);
});

test("from array, to array", () => {
  const result = toArray(fromArray([1, 2, 3, 4, 5]));

  expect(result).toEqual([1, 2, 3, 4, 5]);
});
