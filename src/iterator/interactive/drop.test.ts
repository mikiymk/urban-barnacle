import { test, expect } from "vitest";

import { drop, dropCount, dropWhile } from "./drop";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe(undefined);
  expect(yield 2).toBe(undefined);
  expect(yield 3).toBe("4");
  expect(yield 4).toBe("5");
  expect(yield 5).toBe("6");

  return 42;
};

test("dropCount count", () => {
  const it = dropCount(iterator(), 2);

  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });

  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("drop count", () => {
  const it = drop(iterator(), 2);

  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });

  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("dropWhile while", () => {
  const it = dropWhile(iterator(), (item) => item <= 2);

  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });

  expect(it.next("6")).toEqual({ done: true, value: 42 });
});

test("drop while", () => {
  const it = drop(iterator(), (item) => item <= 2);

  expect(it.next("3")).toEqual({ done: false, value: 3 });
  expect(it.next("4")).toEqual({ done: false, value: 4 });
  expect(it.next("5")).toEqual({ done: false, value: 5 });

  expect(it.next("6")).toEqual({ done: true, value: 42 });
});
