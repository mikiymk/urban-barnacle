import { test, expect } from "vitest";

import { find } from "./find";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("find all match", () => {
  const result = find(iterator(), (item) => item > 0);

  expect(result).toBe(1);
});

test("find no match", () => {
  const result = find(iterator(), (item) => item < 0);

  expect(result).toBe(undefined);
});

test("find 1 match", () => {
  const result = find(iterator(), (item) => item === 3);

  expect(result).toBe(3);
});
