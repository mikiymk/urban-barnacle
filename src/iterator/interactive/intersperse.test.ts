import { test, expect } from "vitest";

import { intersperse } from "./intersperse";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("4");
  expect(yield 3).toBe("6");
  expect(yield 4).toBe("8");
  expect(yield 5).toBe("10");

  return 42;
};

test("intersperse", () => {
  expect.assertions(10 + 5);

  const result = intersperse(iterator(), 0);

  expect(result.next("1")).toEqual({ done: false, value: 1 });
  expect(result.next("2")).toEqual({ done: false, value: 0 });
  expect(result.next("3")).toEqual({ done: false, value: 2 });
  expect(result.next("4")).toEqual({ done: false, value: 0 });
  expect(result.next("5")).toEqual({ done: false, value: 3 });
  expect(result.next("6")).toEqual({ done: false, value: 0 });
  expect(result.next("7")).toEqual({ done: false, value: 4 });
  expect(result.next("8")).toEqual({ done: false, value: 0 });
  expect(result.next("9")).toEqual({ done: false, value: 5 });
  expect(result.next("10")).toEqual({ done: true, value: 42 });
});
