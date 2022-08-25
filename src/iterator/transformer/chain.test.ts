import { test, expect } from "vitest";

import { chain } from "./chain";

export const iterator1 = function* (): Generator<
  number,
  number,
  string | undefined
> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

export const iterator2 = function* (): Generator<number, number, undefined> {
  yield 6;
  yield 7;
  yield 8;
  yield 9;
  yield 10;

  return 43;
};

test("chain 1 iterator", () => {
  const it = chain(iterator1());

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});

test("chain 2 iterator", () => {
  const it = chain(iterator1(), iterator2());

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });
  expect(it.next()).toEqual({ done: false, value: 6 });
  expect(it.next()).toEqual({ done: false, value: 7 });
  expect(it.next()).toEqual({ done: false, value: 8 });
  expect(it.next()).toEqual({ done: false, value: 9 });
  expect(it.next()).toEqual({ done: false, value: 10 });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
