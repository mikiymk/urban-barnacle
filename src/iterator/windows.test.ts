import { test, expect } from "vitest";

import { windows } from "./windows";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe("2");
  expect(yield 3).toBe("3");
  expect(yield 4).toBe("4");
  expect(yield 5).toBe("5");

  return 42;
};

test("iterator to array", () => {
  expect.assertions(5 + 5);

  const it = windows(iterator(), 2);

  expect(it.next("1")).toEqual({ done: false, value: [1, 2] });
  expect(it.next("2")).toEqual({ done: false, value: [2, 3] });
  expect(it.next("3")).toEqual({ done: false, value: [3, 4] });
  expect(it.next("4")).toEqual({ done: false, value: [4, 5] });
  expect(it.next("5")).toEqual({ done: true, value: 42 });
});
