import { test, expect } from "vitest";

import { some } from "./some";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("some all true", () => {
  expect.assertions(1 + 0);

  const result = some(iterator(), (item) => item > 0);

  expect(result).toBe(true);
});

test("some all false", () => {
  expect.assertions(1 + 5);

  const result = some(iterator(), (item) => item > 6);

  expect(result).toBe(false);
});

test("some first true, rest false", () => {
  expect.assertions(1 + 0);

  const result = some(iterator(), (item) => item === 1);

  expect(result).toBe(true);
});

test("some first false, rest true", () => {
  expect.assertions(1 + 1);

  const result = some(iterator(), (item) => item !== 1);

  expect(result).toBe(true);
});

test("some last true, rest false", () => {
  expect.assertions(1 + 4);

  const result = some(iterator(), (item) => item === 5);

  expect(result).toBe(true);
});

test("some last false, rest true", () => {
  expect.assertions(1 + 0);

  const result = some(iterator(), (item) => item !== 5);

  expect(result).toBe(true);
});
