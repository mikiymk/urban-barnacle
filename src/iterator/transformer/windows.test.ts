import { test, expect } from "vitest";

import { windows } from "./windows";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("iterator to array", () => {
  const it = windows(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: [1, 2] });
  expect(it.next()).toEqual({ done: false, value: [2, 3] });
  expect(it.next()).toEqual({ done: false, value: [3, 4] });
  expect(it.next()).toEqual({ done: false, value: [4, 5] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
