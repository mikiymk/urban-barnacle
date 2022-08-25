import { test, expect } from "vitest";

import { chunks } from "./chunks";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe("3");
  expect(yield 4).toBe("3");
  expect(yield 5).toBe("5");

  return 42;
};

test("chunks 2", () => {
  expect.assertions(4 + 5);

  const it = chunks(iterator(), 2);

  expect(it.next("1")).toEqual({ done: false, value: [1, 2] });
  expect(it.next("3")).toEqual({ done: false, value: [3, 4] });
  expect(it.next("5")).toEqual({ done: false, value: [5] });
  expect(it.next()).toEqual({ done: true, value: 42 });
});
