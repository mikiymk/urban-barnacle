import { test, expect } from "vitest";

import { some } from "./some";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("some all true", () => {
  const result = some(iterator(), (item) => item > 0);

  expect(result).toBe(true);
});

test("some all false", () => {
  const result = some(iterator(), (item) => item > 6);

  expect(result).toBe(false);
});

test("some first true, rest false", () => {
  const result = some(iterator(), (item) => item === 1);

  expect(result).toBe(true);
});

test("some first false, rest true", () => {
  const result = some(iterator(), (item) => item !== 1);

  expect(result).toBe(true);
});

test("some last true, rest false", () => {
  const result = some(iterator(), (item) => item === 5);

  expect(result).toBe(true);
});

test("some last false, rest true", () => {
  const result = some(iterator(), (item) => item !== 5);

  expect(result).toBe(true);
});
