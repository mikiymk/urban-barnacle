import { test, expect } from "vitest";

import { every } from "./every";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("every all true", () => {
  const result = every(iterator(), (item) => item > 0);

  expect(result).toBe(true);
});

test("every all false", () => {
  const result = every(iterator(), (item) => item > 6);

  expect(result).toBe(false);
});

test("every first true, rest false", () => {
  const result = every(iterator(), (item) => item === 1);

  expect(result).toBe(false);
});

test("every first false, rest true", () => {
  const result = every(iterator(), (item) => item !== 1);

  expect(result).toBe(false);
});

test("every last true, rest false", () => {
  const result = every(iterator(), (item) => item === 5);

  expect(result).toBe(false);
});

test("every last false, rest true", () => {
  const result = every(iterator(), (item) => item !== 5);

  expect(result).toBe(false);
});
