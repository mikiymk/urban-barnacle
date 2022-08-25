import { test, expect } from "vitest";

import { reduce } from "./reduce";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("reduce", () => {
  const result = reduce(iterator(), (prev, curr) => prev * curr);

  expect(result).toBe(120);
});

test("reduce with initial value", () => {
  const result = reduce(iterator(), (prev, curr) => prev + String(curr), "");

  expect(result).toBe("12345");
});
