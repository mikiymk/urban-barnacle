import { test, expect } from "vitest";

import { identity } from "./identity";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("no identity", () => {
  const result = iterator();

  expect(result.next()).toEqual({ done: false, value: 1 });
  expect(result.next()).toEqual({ done: false, value: 2 });
  expect(result.next()).toEqual({ done: false, value: 3 });
  expect(result.next()).toEqual({ done: false, value: 4 });
  expect(result.next()).toEqual({ done: false, value: 5 });
  expect(result.next()).toEqual({ done: true, value: 42 });
});

test("identity", () => {
  const result = identity(iterator());

  expect(result.next()).toEqual({ done: false, value: 1 });
  expect(result.next()).toEqual({ done: false, value: 2 });
  expect(result.next()).toEqual({ done: false, value: 3 });
  expect(result.next()).toEqual({ done: false, value: 4 });
  expect(result.next()).toEqual({ done: false, value: 5 });
  expect(result.next()).toEqual({ done: true, value: undefined });
});
