import { test, expect } from "vitest";

import { range } from "./range";

test("range", () => {
  const it = range(0, 5);

  expect(it.next()).toEqual({ done: false, value: 0 });
  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("range start", () => {
  const it = range(5, 10);

  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: false, value: 6 });
  expect(it.next()).toEqual({ done: false, value: 7 });
  expect(it.next()).toEqual({ done: false, value: 8 });
  expect(it.next()).toEqual({ done: false, value: 9 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("range minus start", () => {
  const it = range(-5, 0);

  expect(it.next()).toEqual({ done: false, value: -5 });
  expect(it.next()).toEqual({ done: false, value: -4 });
  expect(it.next()).toEqual({ done: false, value: -3 });
  expect(it.next()).toEqual({ done: false, value: -2 });
  expect(it.next()).toEqual({ done: false, value: -1 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("range reverse", () => {
  const it = range(5, 0);

  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
