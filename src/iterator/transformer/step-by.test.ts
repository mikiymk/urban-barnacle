import { test, expect } from "vitest";

import { stepBy } from "./step-by";

const iterator = function* (): Generator<number, number, undefined> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;

  return 42;
};

test("step by 2", () => {
  const result = stepBy(iterator(), 2);

  expect(result.next()).toEqual({ done: false, value: 1 });
  expect(result.next()).toEqual({ done: false, value: 3 });
  expect(result.next()).toEqual({ done: false, value: 5 });
  expect(result.next()).toEqual({ done: true, value: undefined });
});
