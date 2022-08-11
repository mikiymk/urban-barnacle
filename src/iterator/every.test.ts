import { test, expect } from "vitest";

import { every } from "./every";

const iterator = function* (): Generator<number, number, undefined> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("every all true", () => {
  expect.assertions(1 + 5);

  const result = every(iterator(), (item) => item > 0);

  expect(result).toBe(true);
});

test("every all false", () => {
  expect.assertions(1 + 0);

  const result = every(iterator(), (item) => item > 6);

  expect(result).toBe(false);
});

test("every first true, rest false", () => {
  expect.assertions(1 + 1);

  const result = every(iterator(), (item) => item === 1);

  expect(result).toBe(false);
});

test("every first false, rest true", () => {
  expect.assertions(1 + 0);

  const result = every(iterator(), (item) => item !== 1);

  expect(result).toBe(false);
});

test("every last true, rest false", () => {
  expect.assertions(1 + 0);

  const result = every(iterator(), (item) => item === 5);

  expect(result).toBe(false);
});

test("every last false, rest true", () => {
  expect.assertions(1 + 4);

  const result = every(iterator(), (item) => item !== 5);

  expect(result).toBe(false);
});
