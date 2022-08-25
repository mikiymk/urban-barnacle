import { test, expect } from "vitest";

import { chunks } from "./chunks";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("chunks 2", () => {
  const it = chunks(iterator(), 2);

  expect(it.next()).toEqual({ done: false, value: [1, 2] });
  expect(it.next()).toEqual({ done: false, value: [3, 4] });
  expect(it.next()).toEqual({ done: false, value: [5] });
  expect(it.next()).toEqual({ done: true, value: undefined });
});
