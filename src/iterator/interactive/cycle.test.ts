import { test, expect } from "vitest";

import { cycle } from "./cycle";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("3");
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

test("cycle", () => {
  const it = cycle(iterator());

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });
  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });

  expect(it.next("6")).toEqual({ done: false, value: 1 });
  expect(it.next("7")).toEqual({ done: false, value: 2 });
  expect(it.next("8")).toEqual({ done: false, value: 3 });
  expect(it.next("9")).toEqual({ done: false, value: 4 });
  expect(it.next("10")).toEqual({ done: false, value: 5 });

  expect(it.next("11")).toEqual({ done: false, value: 1 });
});
