import { test, expect } from "vitest";

import { take, takeCount, takeWhile } from "./take";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("take-count count", () => {
  const it = takeCount(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("take count", () => {
  const it = take(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("take-while while", () => {
  const it = takeWhile(iterator(), (item) => item <= 2);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("take while", () => {
  const it = take(iterator(), (item) => item <= 2);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});
