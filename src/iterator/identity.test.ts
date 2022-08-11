import { test, expect } from "vitest";

import { identity } from "./identity";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

test("no identity", () => {
  expect.assertions(6 + 5);

  const result = iterator();

  expect(result.next("1")).toEqual({ done: false, value: 1 });
  expect(result.next("2")).toEqual({ done: false, value: 2 });
  expect(result.next("3")).toEqual({ done: false, value: 3 });
  expect(result.next("4")).toEqual({ done: false, value: 4 });
  expect(result.next("5")).toEqual({ done: false, value: 5 });
  expect(result.next("6")).toEqual({ done: true, value: 42 });
});

test("identity", () => {
  expect.assertions(6 + 5);

  const result = identity(iterator());

  expect(result.next("1")).toEqual({ done: false, value: 1 });
  expect(result.next("2")).toEqual({ done: false, value: 2 });
  expect(result.next("3")).toEqual({ done: false, value: 3 });
  expect(result.next("4")).toEqual({ done: false, value: 4 });
  expect(result.next("5")).toEqual({ done: false, value: 5 });
  expect(result.next("6")).toEqual({ done: true, value: 42 });
});
