import { test, expect } from "vitest";

import { filter } from "./filter";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("filter no filtered", () => {
  const it = filter(iterator(), (item) => item > 0);

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("filter some filtered", () => {
  const it = filter(iterator(), (item) => item % 2 === 0);

  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("filter all filtered", () => {
  const it = filter(iterator(), (item) => item < 0);

  expect(it.next()).toEqual({ done: true, value: undefined });
});
