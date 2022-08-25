import { test, expect } from "vitest";

import { drop, dropCount, dropWhile } from "./drop";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("dropCount count", () => {
  const it = dropCount(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("drop count", () => {
  const it = drop(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("dropWhile while", () => {
  const it = dropWhile(iterator(), (item) => item <= 2);

  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("drop while", () => {
  const it = drop(iterator(), (item) => item <= 2);

  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: true, value: undefined });
});
