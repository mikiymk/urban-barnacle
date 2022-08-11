import { test, expect } from "vitest";

import { groupBy } from "./group-by";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe(undefined);
  expect(yield 1).toBe(undefined);
  expect(yield 1).toBe(undefined);
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe("2");
  expect(yield 3).toBe("3");
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe("4");
  expect(yield 5).toBe("5");
  expect(yield 5).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("group by predication", () => {
  expect.assertions(6 + 11);

  const result = groupBy(iterator(), (prev, curr) => prev === curr);

  expect(result.next("1")).toEqual({ done: false, value: [1, 1, 1, 1] });
  expect(result.next("2")).toEqual({ done: false, value: [2] });
  expect(result.next("3")).toEqual({ done: false, value: [3, 3] });
  expect(result.next("4")).toEqual({ done: false, value: [4] });
  expect(result.next("5")).toEqual({ done: false, value: [5, 5, 5] });
  expect(result.next("6")).toEqual({ done: true, value: 42 });
});
