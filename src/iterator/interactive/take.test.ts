import { test, expect } from "vitest";

import { take, takeCount, takeWhile } from "./take";

const iterator = function* (): Generator<number, number, string> {
  expect(yield 1).toBe("2");
  expect(yield 2).toBe("6");
  expect(yield 3).toBe(undefined);
  expect(yield 4).toBe(undefined);
  expect(yield 5).toBe(undefined);

  return 42;
};

test("take-count count", () => {
  expect.assertions(3 + 2);

  const it = takeCount(iterator(), 2);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });

  expect(it.next("6")).toEqual({ done: true, value: 3 });
});

test("take count", () => {
  expect.assertions(3 + 2);

  const it = take(iterator(), 2);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });

  expect(it.next("6")).toEqual({ done: true, value: 3 });
});

test("take-while while", () => {
  expect.assertions(3 + 2);

  const it = takeWhile(iterator(), (item) => item <= 2);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });

  expect(it.next("6")).toEqual({ done: true, value: 3 });
});

test("take while", () => {
  expect.assertions(3 + 2);

  const it = take(iterator(), (item) => item <= 2);

  expect(it.next("1")).toEqual({ done: false, value: 1 });
  expect(it.next("2")).toEqual({ done: false, value: 2 });

  expect(it.next("6")).toEqual({ done: true, value: 3 });
});
