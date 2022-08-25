import { test, expect } from "vitest";

import { map } from "./map";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("map", () => {
  const result = map(iterator(), (item) => item * 2);

  expect(result.next()).toEqual({ done: false, value: 2 });
  expect(result.next()).toEqual({ done: false, value: 4 });
  expect(result.next()).toEqual({ done: false, value: 6 });
  expect(result.next()).toEqual({ done: false, value: 8 });
  expect(result.next()).toEqual({ done: false, value: 10 });
  expect(result.next()).toEqual({ done: true, value: undefined });
});
