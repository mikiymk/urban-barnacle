import { test, expect } from "vitest";

import { intersperse } from "./intersperse";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("intersperse", () => {
  const result = intersperse(iterator(), 0);

  expect(result.next()).toEqual({ done: false, value: 1 });
  expect(result.next()).toEqual({ done: false, value: 0 });
  expect(result.next()).toEqual({ done: false, value: 2 });
  expect(result.next()).toEqual({ done: false, value: 0 });
  expect(result.next()).toEqual({ done: false, value: 3 });
  expect(result.next()).toEqual({ done: false, value: 0 });
  expect(result.next()).toEqual({ done: false, value: 4 });
  expect(result.next()).toEqual({ done: false, value: 0 });
  expect(result.next()).toEqual({ done: false, value: 5 });
  expect(result.next()).toEqual({ done: true, value: undefined });
});
