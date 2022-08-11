import { test, expect } from "vitest";

import { find } from "./find";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("find all match", () => {
  expect.assertions(1 + 0);

  const result = find(iterator(), (item) => item > 0);

  expect(result).toBe(1);
});

test("find no match", () => {
  expect.assertions(1 + 5);

  const result = find(iterator(), (item) => item < 0);

  expect(result).toBe(undefined);
});

test("find 1 match", () => {
  expect.assertions(1 + 2);

  const result = find(iterator(), (item) => item === 3);

  expect(result).toBe(3);
});
