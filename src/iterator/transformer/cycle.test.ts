import { test, expect } from "vitest";

import { cycle } from "./cycle";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("cycle", () => {
  const it = cycle(iterator());

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: false, value: 1 });
  expect(it.next()).toEqual({ done: false, value: 2 });
  expect(it.next()).toEqual({ done: false, value: 3 });
  expect(it.next()).toEqual({ done: false, value: 4 });
  expect(it.next()).toEqual({ done: false, value: 5 });

  expect(it.next()).toEqual({ done: false, value: 1 });
});
