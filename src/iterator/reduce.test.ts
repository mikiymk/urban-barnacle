import { test, expect } from "vitest";

import { reduce } from "./reduce";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("reduce", () => {
  expect.assertions(1 + 5);

  const result = reduce(iterator(), (prev, curr) => prev * curr);

  expect(result).toBe(120);
});

test("reduce with initial value", () => {
  expect.assertions(1 + 5);

  const result = reduce(iterator(), (prev, curr) => prev + String(curr), "");

  expect(result).toBe("12345");
});
